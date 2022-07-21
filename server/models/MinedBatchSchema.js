const mongoose = require("mongoose");
const MinedBatch = new mongoose.Schema({
  mine_id: {
    type: String,
    required: true,
    unique: true,
  },
  officer_id: {
    type: String,
    unique: true,
    required: true,
  },
  batch_id: {
    type: String,
    required: true,
    unique: true,
  },
  type_of_ore: {
    type: String,
    maxlength: 20,
    lowercase: true,
    required: true,
  },
  amount_of_Fe: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending"
  },
  sample_image: {
    type: Object,
    required: true,
  },
  document: {
    type: Object,
    required: true,
  },
}, {
  timestamps: true
});
module.exports = mongoose.connection.useDb("Miner").model("MinedBatch", MinedBatch);