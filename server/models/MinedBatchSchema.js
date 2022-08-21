const mongoose = require("mongoose");
const MinedBatch = new mongoose.Schema(
  {
    mine_id: {
      type: String,
      required: true,
    },
    manager_id: {
      type: String,
      required: true,
    },
    officer_id: {
      type: String,
      required: true,
    },
    lab_id: {
      type: String,
      required: true,
    },
    type_of_ore: {
      type: String,
      enum: ["fine", "lump", "iron_pellet"],
      required: true,
    },
    grade: {
      type: String,
      enum: ["high", "medium", "low"],
    },
    fe_percentage: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["testing", "pending", "approved", "rejected"],
      default: "testing",
      required: true,
    },
    sample_image_url: {
      type: String,
      required: true,
    },
    mine_lab_report_url: {
      type: String,
    },
    gov_lab_report_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Mined Batch", MinedBatch);
