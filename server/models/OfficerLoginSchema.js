const mongoose = require("mongoose");
const OfficerLogin = new mongoose.Schema({
    officer_id: {
        type: String,
        unique: true,
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
module.exports = mongoose.connection.useDb("Officer").model("Login", OfficerLogin);