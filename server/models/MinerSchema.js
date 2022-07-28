const mongoose = require("mongoose");
const Miner = new mongoose.Schema({
  organization_id: {
    type: String,
    required: true,
  },
  manager_id: {
    type: String,
    required: true,
  },
  region_id: {
    type: String,
    required: true,
  },
  location: {
    pin_code: {
      type: String,
      trim: true,
      maxlength: 20,
      required: true,
    },
    coordinates: {
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
  },
  area: {
    type: Number,
    required: true,
  },
  warehouse_capacity: {
    type: Number,
    required: true,
  },
  lease_period: {
    from: {
      type: String,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
});
module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Miner", Miner);
