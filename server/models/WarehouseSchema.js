const mongoose = require("mongoose");

const Warehouse = new mongoose.Schema({
  mine_id: {
    type: String,
    required: true,
  },
  warehouse_manager_id: {
    type: String,
    required: true,
  },
  ores_available: {
    high: {
      fine: {
        type: Number,
        default: 0,
        required: true,
      },
      lump: {
        type: Number,
        default: 0,
        required: true,
      },
      iron_pellet: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    medium: {
      fine: {
        type: Number,
        default: 0,
        required: true,
      },
      lump: {
        type: Number,
        default: 0,
        required: true,
      },
      iron_pellet: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    low: {
      fine: {
        type: Number,
        default: 0,
        required: true,
      },
      lump: {
        type: Number,
        default: 0,
        required: true,
      },
      iron_pellet: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  },
  area: {
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
});

module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Warehouse", Warehouse);