const mongoose = require("mongoose");
const CheckPointOfficer = new mongoose.Schema({
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
  .model("Check Point Officer", CheckPointOfficer);
// Add Check Point Officer
