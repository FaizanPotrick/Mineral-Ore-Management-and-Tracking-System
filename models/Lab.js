const { Schema, connection } = require("mongoose");

const Lab = new Schema({
  manager_id: {
    type: String,
    required: true,
  },
  lab_name: {
    type: String,
    trim: true,
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

module.exports = connection.useDb("SIH-2022").model("Lab", Lab);
