const mongoose = require("mongoose");

const TestedMinedBatch = new mongoose.Schema(
  {
    mine_id: {
      type: String,
      required: true,
    },
    manager_id: {
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
      enum: ["dispatched", "delivered"],
      default: "dispatched",
      required: true,
    },
    tested_mined_batch_hash: {
      type: String,
      required: true,
    },
    sample_image_url: {
      type: String,
      required: true,
    },
    mine_lab_report_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Tested Mined Batch", TestedMinedBatch);
