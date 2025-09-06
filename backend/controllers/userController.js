const User = require('../models/User');
const AllUser = require('../models/AllUser');
const nodemailer = require('nodemailer');


// Temporary OTP storage (In a real app, use Redis or a database with TTL)
const otpStore = {};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return res.status(409).json({ message: 'User already exists and is verified.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Your One-Time Password (OTP) - ¡Bienvenido to Hello Tacoz!",
  html: `
    <div style="font-family: Arial, sans-serif; background-color: #fff7f0; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; border: 1px solid #f0e0d0;">
      <div style="text-align: center;">
        <h1 style="color: #d32f2f; margin-bottom: 10px;">🌮 Hello Tacoz</h1>
        <p style="color: #444; font-size: 16px; margin: 0;">Authentic Mexican Flavours in the UK</p>
      </div>
      <hr style="border: none; border-top: 1px solid #e0cfc0; margin: 20px 0;" />
      <p style="font-size: 16px; color: #333;">
        Hola! 👋 <br><br>
        To complete your registration, please use the following one-time password (OTP):
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
        © ${new Date().getFullYear()} [Your Brand Name]. Bringing Mexican street food to your doorstep 🌶️
      </p>
    </div>
  `,
};


    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

// Verify OTP and save user
exports.verifyOtpAndSaveUser = async (req, res) => {
  const { name, email, phone, otp } = req.body;

  if (!name || !email || !phone || !otp) {
    return res.status(400).json({ message: 'Missing required fields in request body.' });
  }

  const storedOtp = otpStore[email];
  if (!storedOtp || storedOtp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      user.name = name;
      user.phone = phone;
      user.isVerified = true;
      await user.save();
    } else {
      user = new User({ name, email, phone, isVerified: true });
      await user.save();
    }

    delete otpStore[email];
    res.status(201).json({ message: 'User registered and verified successfully!', user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Failed to save user data.' });
  }
};

// Social login and data saving
exports.socialLogin = async (req, res) => {
  const { name, email, isVerified } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      user.name = name;
      user.isVerified = isVerified;
      await user.save();
      return res.status(200).json({ message: 'User logged in successfully.', user });
    } else {
      user = new User({ name, email, isVerified: true });
      await user.save();
      return res.status(201).json({ message: 'New user created successfully.', user });
    }
  } catch (error) {
    console.error('Error during social login:', error);
    res.status(500).json({ message: 'Failed to process social login.' });
  }
};





exports.addAllUser = async (req, res) => {
  const allData = req.body;

  try {
    const user = new AllUser({ ...allData, isVerified: true });
    await user.save();

    return res.status(201).json({ message: 'New user created successfully.', user });
  } catch (error) {
    console.error('Error during all data:', error);
    return res.status(500).json({ message: 'Failed to process social login.', error: error.message });
  }
};
