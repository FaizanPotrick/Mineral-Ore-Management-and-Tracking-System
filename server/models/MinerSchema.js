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
      type: Number,
      required: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
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
