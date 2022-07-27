const mongoose = require("mongoose");
const Region = new mongoose.Schema({
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
      type: mongoose.Types.Decimal128,
      required: true,
    },
    longitude: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
});
module.exports = mongoose.connection
  .useDb("Ores_Tracking")
  .model("Region", Region);
