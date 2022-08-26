const mongoose = require("mongoose");

const Transaction = new mongoose.Schema(
  {
    transport_id: {
      type: String,
      
    },
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
      enum: ["fine", "lump", "iron pellet"],
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
      enum: ["pending", "dispatched", "delivered","holding"],
      default: "pending",
      required: true,
    },
    checkpoints: {
      type: Array,
    },
    // total_vehicles: {
    //   type: Number,
    //   required: true,
    // },
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
  
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Transaction", Transaction);
