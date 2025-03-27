const Portfolio = require("../models/Portfolio");

// ✅ CREATE Portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const newPortfolio = new Portfolio({ ...req.body, userId: req.user.id });
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET User Portfolio
exports.getUserPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE Portfolio
exports.updatePortfolio = async (req, res) => {
  try {
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE Portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    await Portfolio.findOneAndDelete({ userId: req.user.id });
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
