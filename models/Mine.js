const { Schema, connection } = require("mongoose");

const Mine = new Schema({
  manager_id: {
    type: String,
    required: true,
  },
  region_id: {
    type: String,
    required: true,
  },
  mine_name: {
    type: String,
    trim: true,
    lowercase: true,
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
  rom: {
    type: Number,
    required: true,
    default: 0,
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

module.exports = connection.useDb("SIH-2022").model("Mine", Mine);
