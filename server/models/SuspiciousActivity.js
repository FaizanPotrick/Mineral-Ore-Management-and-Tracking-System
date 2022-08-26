const mongoose = require("mongoose");

const SuspiciousActivity = new mongoose.Schema({
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
});

module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Suspicious Activity", SuspiciousActivity);
