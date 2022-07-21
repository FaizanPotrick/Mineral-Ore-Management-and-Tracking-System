const mongoose = require("mongoose");
const Organization = new mongoose.Schema({
    organization_id: {
        type: String,
        unique: true,
        required: true,
    },
    ceo_id: {
        type: String,
        unique: true,
        required: true,
    },
    organization_name: {
        type: String,
        trim: true,
        maxlength: 300,
        lowercase: true,
        required: true,
    },
    gst_no: {
        type: String,
        minlength: 15,
        maxlength: 15,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        maxlength: 500,
        lowercase: true,
        required: true,
    },
});
module.exports = mongoose.connection.useDb("Organization").model("Registration", Organization);