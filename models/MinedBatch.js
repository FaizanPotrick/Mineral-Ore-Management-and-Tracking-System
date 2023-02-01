const { Schema, connection } = require("mongoose");

const MinedBatch = new Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("SIH-2022").model("Mined Batch", MinedBatch);
