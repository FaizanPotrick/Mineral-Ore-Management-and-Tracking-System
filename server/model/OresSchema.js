const mongoose = require("mongoose");
const Ores = new mongoose.Schema(
  {
    auth: {
      type: String,
      required: true,
      unique: true,
    },
    batch_id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
      required: true,
    },
    grade: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      minlength: 1,
      maxlength: 50,
      required: true,
    },
    document: {
      type: String,
      trim: true,
      default: "document",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.connection.useDb("Datas").model("Ores", Ores);
