const mongoose = require("mongoose");
const Miner = new mongoose.Schema({
  mine_id: {
    type: String,
    unique: true,
    required: true,
  },
  organization_id: {
    type: String,
    required: true,
  },
  manager_id: {
    type: String,
    required: true,
  },
  location: {
    district: {
      type: String,
      trim: true,
      maxlength: 50,
      lowercase: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      maxlength: 50,
      lowercase: true,
      required: true,
    },
    pin_code: {
      type: String,
      maxlength: 20,
      required: true,
    },
    coordinate: {
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
    trim: true,
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
  .useDb("Registration")
  .model("Miner", Miner);
