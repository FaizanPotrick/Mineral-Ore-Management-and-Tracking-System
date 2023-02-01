const { Schema, connection } = require("mongoose");

const Region = new Schema({
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

module.exports = connection.useDb("SIH-2022").model("Region", Region);
