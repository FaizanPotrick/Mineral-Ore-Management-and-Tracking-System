const { Schema, connection } = require("mongoose");

const Image = new Schema({
  batch_id: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

module.exports = connection.useDb("SIH-2022").model("Image", Image);
