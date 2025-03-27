const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  projects: [
    {
      title: String,
      link: String,
      description: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", portfolioSchema);
