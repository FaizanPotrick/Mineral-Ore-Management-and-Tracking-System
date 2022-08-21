const mongoose = require("mongoose");
const Lab = new mongoose.Schema({
    region_id: {
        type: String,
    },
    lab_manager_id: {
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
    .model("Lab", Lab);