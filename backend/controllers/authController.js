const User = require("../models/User");

const otpStore = {}; // temporary storage

// 🔥 SEND OTP
exports.sendOtp = (req, res) => {
  const { mobile } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;

  console.log("OTP:", otp);

  res.json({ message: "OTP sent successfully" });
};

// 🔥 VERIFY OTP
exports.verifyOtp = (req, res) => {
  const { mobile, otp } = req.body;

  if (otpStore[mobile] == otp) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

// 🔥 REGISTER USER (FIXED)
exports.register = async (req, res) => {
  try {
    console.log("Register API HIT");

    const {
      role,
      mobile,
      email,
      password,
      adminCode
    } = req.body;

    // ✅ EMAIL VALIDATION
    if (!email) {
      return res.status(400).json({ message: "Email is required ❌" });
    }

    // 🔐 Admin security
    if (role === "Admin" && adminCode !== "MSRTC@123") {
      return res.json({ message: "Invalid Admin Code" });
    }

    // ❗ Check existing user (mobile OR email)
    const existingUser = await User.findOne({
      $or: [{ mobile }, { email }]
    });

    if (existingUser) {
      return res.json({ message: "User already exists (mobile/email) ❌" });
    }

    // 🔥 CREATE USER (explicit fields = safer)
    const newUser = new User({
      role,
      mobile,
      email,
      password,
      ...req.body
    });

    // 🚨 SAVE
    await newUser.save();

    console.log("User saved in MongoDB ✅");

    // 🧹 Remove OTP
    delete otpStore[mobile];

    res.json({ message: "Registration successful ✅" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful ✅", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};