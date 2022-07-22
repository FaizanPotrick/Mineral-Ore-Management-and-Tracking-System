const mongoose = require("mongoose");
const Miner = new mongoose.Schema({
  mine_id: {
    type: String,
    unique: true,
    required: true,
  },
  organization_id: {
    type: String,
    unique: true,
    required: true,
  },
  manager_id: {
    type: String,
    unique: true,
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
    pincode: {
      type: String,
      maxlength: 20,
      required: true,
    },
    coordinate: {
      latitude: {
        type: mongoose.Decimal128,
        required: true,
      },
      longitude: {
        type: mongoose.Decimal128,
        required: true,
      }
    }
  },
  mine_warehouse_capacity: {
    type: Number,
    required: true,
  },
  mine_area: {
    type: mongoose.Decimal128,
    trim: true,
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
module.exports = mongoose.connection.useDb("Miner").model("Registration", Miner);