const mongoose = require("mongoose");
const OrganizationRegistration = new mongoose.Schema({
    auth: {
        type: String,
        required: true,
        unique: true,
    },
    organization_id: {
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
    email_address: {
        type: String,
        maxlength: 150,
        lowercase: true,
        unique: true,
        required: true,
    },
    phone_no: {
        type: String,
        maxlength: 15,
        required: true,
    },
    pan_card: {
        type: String,
        minlength: 10,
        maxlength: 10,
        unique: true,
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
}, {
    timestamps: true
});
module.exports = mongoose.connection.useDb("Organization").model("Registration", OrganizationRegistration);