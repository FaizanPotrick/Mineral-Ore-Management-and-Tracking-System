const { Schema, connection } = require("mongoose");

const User = new Schema(
  {
    user_id: {
      type: String,
      unique: true,
      required: true,
    },
    type_of_user: {
      type: String,
      enum: [
        "government",
        "organization",
        "mine",
        "warehouse",
        "checkpoint",
        "lab",
      ],
      required: true,
    },
    user_name: {
      type: String,
      trim: true,
      required: true,
    },
    email_address: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    is_valid: {
      type: Boolean,
      default: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = connection.useDb("SIH-2022").model("User", User);
