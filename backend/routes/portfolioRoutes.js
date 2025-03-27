const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPortfolio,
  getUserPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const router = express.Router();

// Portfolio Routes
router.post("/", authMiddleware, createPortfolio);
router.get("/", authMiddleware, getUserPortfolio);
router.put("/", authMiddleware, updatePortfolio);
router.delete("/", authMiddleware, deletePortfolio);

module.exports = router;
