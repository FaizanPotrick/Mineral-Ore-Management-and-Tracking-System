const { Schema, connection } = require("mongoose");

const Warehouse = new Schema({
  mine_id: {
    type: String,
    required: true,
  },
  manager_id: {
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
});

module.exports = connection.useDb("SIH-2022").model("Warehouse", Warehouse);
