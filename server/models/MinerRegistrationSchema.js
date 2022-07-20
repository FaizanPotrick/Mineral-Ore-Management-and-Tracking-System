const mongoose = require("mongoose");
const MinerRegistration = new mongoose.Schema({
  auth: {
    type: String,
    required: true,
    unique: true,
  },
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
  manager_name: {
    type: String,
    trim: true,
    maxlength: 150,
    lowercase: true,
    required: true,
  },
  aadhar_card: {
    type: String,
    trim: true,
    minlength: 12,
    maxlength: 12,
    unique: true,
    required: true,
  },
  email_address: {
    type: String,
    unique: true,
    maxlength: 150,
    lowercase: true,
    required: true,
  },
  phone_no: {
    type: String,
    maxlength: 15,
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
}, {
  timestamps: true
});
module.exports = mongoose.connection.useDb("Miner").model("Registration", MinerRegistration);