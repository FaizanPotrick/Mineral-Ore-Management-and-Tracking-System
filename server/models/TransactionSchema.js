const mongoose = require("mongoose");
const Transaction = new mongoose.Schema(
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
    type_of_ore: {
      type: String,
      enum: ["fine", "lump", "iron pellet"],
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
    grade: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    invoice_url: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Transaction", Transaction);
