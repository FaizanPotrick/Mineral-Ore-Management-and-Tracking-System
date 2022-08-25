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
    },
    fe_percentage: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sample_image_url: {
      type: String,
      required: true,
    },
    mine_lab_report_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Tested Mined Batch", TestedMinedBatch);
