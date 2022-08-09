const mongoose = require("mongoose");
const Organisation = new mongoose.Schema({
  ceo_id: {
    type: String,
    required: true,
  },
  organisation_name: {
    type: String,
    trim: true,
    maxlength: 300,
    lowercase: true,
    required: true,
  },
  gst_no: {
    type: String,
    minlength: 15,
    maxlength: 15,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    maxlength: 500,
    lowercase: true,
    required: true,
  },
  ores_bought: {
    fine: {
      high: {
        type: Number,
        default: 0,
        required: true,
      },
      medium: {
        type: Number,
        default: 0,
        required: true,
      },
      low: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    lump: {
      high: {
        type: Number,
        default: 0,
        required: true,
      },
      medium: {
        type: Number,
        default: 0,
        required: true,
      },
      low: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    iron_pellet: {
      high: {
        type: Number,
        default: 0,
        required: true,
      },
      medium: {
        type: Number,
        default: 0,
        required: true,
      },
      low: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  },
});
module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Organisation", Organisation);
