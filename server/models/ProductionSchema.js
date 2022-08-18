const mongoose = require("mongoose");
const MinedBatch = new mongoose.Schema(
    {
        organisation_id: {
            type: String,
            required: true,
        },
        ceo_id: {
            type: String,
            required: true,
        },
        type_of_ore: {
            type: String,
            enum: ["fine", "lump", "iron_pellet"],
            required: true,
        },
        grade: {
            type: String,
            enum: ["high", "medium", "low"],
            required: true,
        },
        fe_percentage: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },

        sample_image_url: {
            type: String,
            // required: true,
        },
        production_lab_report_url: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.connection
    .useDb("Ores_Tracking")
    .model("Mined Batch", MinedBatch);
