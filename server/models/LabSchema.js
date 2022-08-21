const mongoose = require("mongoose");
const Lab = new mongoose.Schema({
  lab_manager_id: {
    type: String,
    required: true,
  },
  region_id: {
    type: String,
    required: true,
  },
  lab_name: {
    type: String,
    trim: true,
    maxlength: 300,
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
});
module.exports = mongoose.connection.useDb("Ores_Tracking").model("Lab", Lab);
