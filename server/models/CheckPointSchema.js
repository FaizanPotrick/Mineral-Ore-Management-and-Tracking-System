const mongoose = require("mongoose");
const CheckPoint = new mongoose.Schema({
  checkpoint_officer_id: {
    type: String,
    required: true,
  },
  region_id: {
    type: String,
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
module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Check Point", CheckPoint);