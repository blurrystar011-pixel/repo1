require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const Stripe = require("stripe");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Initialize Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------ MULTER SETUP ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "uploads")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// ✅ Upload profile picture route
app.post("/api/upload-profile-pic", upload.single("profilePic"), async (req, res) => {
  try {
    const email = req.body.email;
    const filePath = `/uploads/${req.file.filename}`;

    // TODO: Save filePath in MongoDB (update user's photo)

    res.json({ photoUrl: filePath });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ------------------ STRIPE CHECKOUT ------------------
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { items, email } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email, // Save buyer email
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur", // 🇬🇧 UK customers → GBP also possible
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100), // Stripe needs cents
        },
        quantity: item.qty,
      })),
      success_url: `${process.env.FRONTEND_URL}/cart?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=true`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ error: "Payment session failed" });
  }
});

// ------------------ MONGO CONNECTION ------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Menu related routes (search, filter, etc.)
const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menu", menuRoutes);

// User related routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.use("/api/checkout", require("./routes/checkoutRoutes"));

