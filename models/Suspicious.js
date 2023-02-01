const { Schema, connection } = require("mongoose");

const Suspicious = new Schema(
  {
    region_id: {
      type: String,
      required: true,
    },
    type_of_activity: {
      type: String,
      enum: ["transaction"],
      required: true,
    },
    mine_id: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    price_difference: {
      type: Number,
      required: true,
    },
    transaction_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("SIH-2022").model("Suspicious", Suspicious);
