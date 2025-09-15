const Stripe = require("stripe");
const Order = require("../models/Order");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Temporary in-memory OTP storage
// Structure: { [email]: { otp: "123456", verified: false } }
const otpStore = {};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------------
// 📌 Send OTP
// ---------------------
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, verified: false };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your One-Time Password (OTP) for Checkout",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #fff7f0; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; border: 1px solid #f0e0d0;">
          <div style="text-align: center;">
            <h1 style="color: #d32f2f; margin-bottom: 10px;">🌮 Hello Tacos</h1>
            <p style="color: #444; font-size: 16px; margin: 0;">Complete your order securely</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e0cfc0; margin: 20px 0;" />
          <p style="font-size: 16px; color: #333;">
            Hola! 👋 <br><br>
            To proceed with your checkout, please use the following one-time password (OTP):
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="font-size: 24px; font-weight: bold; background-color: #ffe5d0; padding: 12px 24px; border-radius: 6px; color: #d32f2f; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #666;">
            This OTP will expire in <b>10 minutes</b>. If you didn’t request this, please ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e0cfc0; margin: 20px 0;" />
          <p style="font-size: 13px; color: #999; text-align: center;">
            © ${new Date().getFullYear()} Hello Tacos. Bringing Mexican street food to your doorstep 🌶️
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};

// ---------------------
// 📌 Verify OTP
// ---------------------
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ verified: false, message: "Email & OTP are required" });
  }

  const record = otpStore[email];
  if (!record || record.otp !== otp) {
    return res.status(400).json({ verified: false, message: "Invalid or expired OTP" });
  }

  // ✅ OTP verified, mark as verified
  record.verified = true;

  // Mark or create user as verified
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, isVerified: true });
    await user.save();
  } else if (!user.isVerified) {
    user.isVerified = true;
    await user.save();
  }

  res.json({ verified: true, message: "OTP verified successfully" });
};

// ---------------------
// 📌 Create checkout session (requires verified OTP first)
// ---------------------
exports.createCheckoutSession = async (req, res) => {
  try {
    const { items, email, phone, note, otp } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const record = otpStore[email];
    if (!record || !record.verified || record.otp !== otp) {
      return res.status(400).json({ message: "Invalid or unverified OTP. Please verify first." });
    }

    // ✅ Mark user as verified if not already
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, phone, isVerified: true });
      await user.save();
    } else if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    // Stripe line items
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const amountTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      phone_number_collection: { enabled: true },
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    });

    // Save pending order
    const order = new Order({
      sessionId: session.id,
      customerEmail: email,
      phone,
      amountTotal,
      currency: "EUR",
      items: items.map((i) => ({
        name: i.name,
        quantity: i.qty,
        amount: i.price,
      })),
      note,
      paymentStatus: "unpaid",
      status: "pending",
    });

    await order.save();

    // Delete OTP after successful session creation
    delete otpStore[email];

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Failed to create checkout session." });
  }
};

// ---------------------
// 📌 Stripe Webhook → confirm payment
// ---------------------
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const order = await Order.findOne({ sessionId: session.id });
      if (order) {
        order.paymentStatus = "paid";
        order.status = "confirmed";
        await order.save();
        console.log("✅ Order updated:", order._id);
      }
    } catch (err) {
      console.error("Order update failed:", err.message);
    }
  }

  res.json({ received: true });
};

// ---------------------
// 📌 Get order success
// ---------------------
exports.getOrderSuccess = async (req, res) => {
  try {
    const { session_id } = req.query;

    const order = await Order.findOne({ sessionId: session_id });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json({ message: "Order success!", order });
  } catch (err) {
    console.error("Order fetch failed:", err.message);
    res.status(500).json({ message: "Failed to fetch order." });
  }
};

// Export OTP store for external use (optional)
exports.otpStore = otpStore;
