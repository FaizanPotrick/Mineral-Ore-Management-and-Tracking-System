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
    type_of_ore: {
      type: String,
      enum: ["fine", "lump", "iron_pellet"],
      required: true,
    },
    grade: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    fe_percentage: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    sample_image_path: {
      type: String,
      required: true,
    },
    mine_lab_report_path: {
      type: String,
      required: true,
    },
    gov_lab_report_path: {
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
