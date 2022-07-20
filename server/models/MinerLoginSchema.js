const mongoose = require("mongoose");
const MinerLogin = new mongoose.Schema({
    mine_id: {
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
module.exports = mongoose.connection.useDb("Miner").model("Login", MinerLogin);