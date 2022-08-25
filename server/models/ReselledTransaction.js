const mongoose = require("mongoose");

const ReselledTransaction = new mongoose.Schema(
  {
    transport_id: {
      type: String,
      required: true,
    },
    seller_id: {
      type: String,
      required: true,
    },
    seller_ceo_id: {
      type: String,
      required: true,
    },
    buyer_ceo_id: {
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
    status: {
      type: String,
      enum: ["pending", "dispatched", "delivered"],
      default: "dispatched",
      required: true,
    },
    checkpoints: {
      type: Array,
    },
    total_vehicles: {
      type: Number,
      required: true,
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
    driving_license: {
      type: String,
      required: true,
    },
    invoice_url: {
      type: String,
      required: true,
    },
    lab_report_url: {
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
  .model("Reselled Transaction", ReselledTransaction);
