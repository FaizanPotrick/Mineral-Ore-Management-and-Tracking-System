const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    auth: {
      type: String,
      unique: true,
      required: true,
    },
    user_id: {
      type: String,
      unique: true,
      required: true,
    },
    type_of_user: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      trim: true,
      maxlength: 150,
      lowercase: true,
      required: true,
    },
    aadhar_card: {
      type: String,
      trim: true,
      unique: true,
      minlength: 12,
      maxlength: 12,
      required: true,
    },
    email_address: {
      type: String,
      unique: true,
      maxlength: 150,
      trim: true,
      lowercase: true,
      required: true,
    },
    phone_no: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 10,
      required: true,
    },
    is_valid: {
      type: Boolean,
      default: true,
      required: true,
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
  {
    timestamps: true,
  }
);
module.exports = mongoose.connection.useDb("Registration").model("User", User);