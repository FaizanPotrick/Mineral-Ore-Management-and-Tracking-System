const { Schema, connection } = require("mongoose");

const CheckPoint = new Schema({
  officer_id: {
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

module.exports = connection.useDb("SIH-2022").model("Check Point", CheckPoint);
