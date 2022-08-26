const mongoose = require("mongoose");

const Mine = new mongoose.Schema({
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
  expected_ores_available: {
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
  plan_doc_url: {
    type: String,
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

module.exports = mongoose.connection.useDb("Ores_Tracking").model("Mine", Mine);
