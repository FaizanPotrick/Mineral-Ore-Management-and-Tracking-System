const mongoose = require("mongoose");
const OfficerRegistraion = new mongoose.Schema({
    auth: {
        type: String,
        required: true,
        unique: true,
    },
    officer_id: {
        type: String,
        unique: true,
        required: true,
    },
    officer_name: {
        type: String,
        trim: true,
        maxlength: 150,
        lowercase: true,
        required: true,
    },
    email_address: {
        type: String,
        maxlength: 30,
        lowercase: true,
        unique: true,
        required: true,
    },
    phone_no: {
        type: String,
        maxlength: 20,
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
    aadhar_card: {
        type: String,
        minlength: 12,
        maxlength: 12,
        unique: true,
        required: true,
    },
}, {
    timestamps: true
});
module.exports = mongoose.connection.useDb("Officer").model("Registration", OfficerRegistraion);