const express = require("express");
const router = express.Router();
const Mine = require("../models/MineSchema");
const Region = require("../models/RegionSchema");
// centerl 62e21c9eef9023b55fe15fe9
// state 62e21cea46c9a67bfe0381c3
// district 62e21cfa46c9a67bfe0383ff
router.post("/api/maps/officer", async (req, res) => {
    const { region_id, type_of_region } = req.body;
    try {
        let mine_list;
        const region_response = await Region.findOne({
            _id: region_id,
            type_of_region: type_of_region
        })
        if (type_of_region === "country") {
            mine_list = await Mine.find();
        }
        if (type_of_region === "state") {
            const region_user = await Region.find({
                officer_id: { $exists: true },
                district: { $exists: true },
                state: region_response.state,
            }).distinct('_id');
            const region = await Mine.find({ region_id: region_user })
            mine_list = region;
        }
        if (type_of_region === "district") {
            mine_list = await Mine.find({
                region_id: region_id,
            });
        }
        res.status(200).json(mine_list);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Invalid Request",
            type: "error",
        });
    }
});
router.post("/api/maps/organization", async (req, res) => {
    const { organization_id } = req.body;
    try {
        const organization_response = await Mine.find({ organization_id: organization_id });
        res.status(200).json(organization_response);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Invalid Request",
            type: "error",
        });
    }
});
module.exports = router;
