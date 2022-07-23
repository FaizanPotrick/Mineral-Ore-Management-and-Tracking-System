const mongoose = require("mongoose");
const Officer = new mongoose.Schema({
  region_id: {
    type: String,
    unique: true,
    required: true,
  },
  officer_id: {
    type: String,
    required: true,
  },
  type_of_region: {
    type: String,
    lowercase: true,
    required: true,
  },
  region_name: {
    type: String,
    lowercase: true,
    required: true,
  },
});
module.exports = mongoose.connection
  .useDb("Registration")
  .model("Officer", Officer);
