const mongoose = require("mongoose");
const User = new mongoose.Schema({
    auth: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        unique: true,
        required: true,
    },
    type_of_user: {
        type: String,
        lowercase: true,
        required: true,
    },
    user_name: {
        type: String,
        trim: true,
        maxlength: 150,
        lowercase: true,
        required: true,
    },
    aadhar_card: {
        type: String,
        trim: true,
        minlength: 12,
        maxlength: 12,
        unique: true,
        required: true
    },
    email_address: {
        type: String,
        unique: true,
        maxlength: 150,
        lowercase: true,
        required: true,
    },
    phone_no: {
        type: String,
        maxlength: 15,
        required: true,
    },
    is_valid: {
        type: boolean,
        default: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    c_password: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true
});
module.exports = mongoose.connection.useDb("User").model("User_Data", User);