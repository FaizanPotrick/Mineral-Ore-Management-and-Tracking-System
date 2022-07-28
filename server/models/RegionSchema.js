const mongoose = require("mongoose");
const Region = new mongoose.Schema({
  officer_id: {
    type: String,
  },
  type_of_region: {
    type: String,
    enum: ["country", "state", "district"],
    required: true,
  },
  country: {
    type: String,
    default: "india",
    required: true,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
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
  .model("Region", Region);
