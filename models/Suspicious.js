const { Schema, connection } = require("mongoose");

const Suspicious = new Schema(
  {
    region_id: {
      type: String,
      required: true,
    },
    type_of_activity: {
      type: String,
      enum: ["all", "transaction"],
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
    },
    transaction_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("SIH-2022").model("Suspicious", Suspicious);
