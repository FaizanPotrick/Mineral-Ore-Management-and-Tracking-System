const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organization = require("../models/OrganizationSchema");

router.get("/api/organization_list", async (req, res) => {
    try {
        const organization_list = await Organization.find().select("organization_name");
        res.status(200).json(organization_list);
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request",
            type: "error",
        });
    }
});
router.get("/api/region_coordinates", async (req, res) => {
    const { type_of_region, region_id } = req.cookies;
    try {
        const coordinates = await Region.findOne({
            _id: region_id,
            type_of_region: type_of_region,
        }).select("coordinates");
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request",
            type: "error",
        });
    }
});
router.get("/api/region_list", async (req, res) => {
    const { type_of_region, region_id } = req.cookies;
    let region_list;
    try {
        const region_user = await Region.findOne({
            _id: region_id,
            type_of_region: type_of_region,
        });
        if (type_of_region === "country") {
            region_list = await Region.find({
                type_of_region: "state",
            }).select("state");
        }
        if (type_of_region === "state") {
            region_list = await Region.find({
                type_of_region: "district",
                state: region_user.state,
            }).select("district");
        }
        res.status(200).json(region_list);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Invalid Request",
            type: "error",
        });
    }
});
module.exports = router;
