const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Logged-in User
exports.getMe = async (req, res) => {
  res.json(req.user);
};

