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
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Mined Batch", MinedBatch);
