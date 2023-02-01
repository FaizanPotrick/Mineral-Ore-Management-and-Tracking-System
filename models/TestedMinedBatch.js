const { Schema, connection } = require("mongoose");

const TestedMinedBatch = new Schema(
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
    waste: {
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
    batch_hash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection
  .useDb("SIH-2022")
  .model("Tested Mined Batch", TestedMinedBatch);
