const mongoose = require("mongoose");
const Officer = new mongoose.Schema({
  region_id: {
    type: String,
    unique: true,
    required: true,
  },
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
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
});
module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Officer", Officer);
