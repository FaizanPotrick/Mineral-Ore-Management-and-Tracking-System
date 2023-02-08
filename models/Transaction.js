const { Schema, connection } = require("mongoose");

const Transaction = new Schema(
  {
    mine_id: {
      type: String,
      required: true,
    },
    manager_id: {
      type: String,
      required: true,
    },
    ceo_id: {
      type: String,
      required: true,
    },
    buyer_org_id: {
      type: String,
      required: true,
    },
    lab_id: {
      type: String,
    },
    type_of_ore: {
      type: String,
      enum: ["fine", "lump", "iron_pellet"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "dispatched", "delivered"],
      default: "pending",
      required: true,
    },
    checkpoints: {
      type: Array,
    },
    royalty: {
      type: Number,
      required: true,
    },
    transaction_hash: {
      type: String,
      required: true,
    },
    vehicle_no: {
      type: String,
      required: true,
    },
    is_suspicious: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("SIH-2022").model("Transaction", Transaction);
