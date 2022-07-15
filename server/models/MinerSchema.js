const mongoose = require("mongoose");
const Miner = new mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
      unique: true,
    },
    mine_name: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 100,
      lowercase: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 150,
      lowercase: true,
      required: true,
    },
    owner_name: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 50,
      lowercase: true,
      required: true,
    },
    email_address: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 30,
      lowercase: true,
      unique: true,
      required: true,
    },
    phone_no: {
      type: String,
      trim: true,
      minlength: 13,
      maxlength: 20,
      lowercase: true,
      required: true,
    },
    block_no: {
      type: String,
      trim: true,
      minlength: 12,
      maxlength: 12,
      unique: true,
      required: true,
    },
    gst_no: {
      type: String,
      trim: true,
      minlength: 15,
      maxlength: 15,
      unique: true,
      required: true,
    },
    lease_period: {
      from: {
        type: String,
        trim: true,
        required: true,
      },
      period: {
        type: Number,
        trim: true,
        minlength: 1,
        maxlength: 3,
        required: true,
      },
      to: {
        type: String,
        trim: true,
        required: true,
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    c_password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.connection.useDb("Miner").model("Registration", Miner);
