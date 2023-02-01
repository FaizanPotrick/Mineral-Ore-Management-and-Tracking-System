const { Schema, connection } = require("mongoose");

const Organization = new Schema({
  ceo_id: {
    type: String,
    required: true,
  },
  organization_name: {
    type: String,
    trim: true,
    required: true,
  },
  gst_no: {
    type: String,
    length: 15,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  ores_bought: {
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

module.exports = connection
  .useDb("SIH-2022")
  .model("Organization", Organization);
