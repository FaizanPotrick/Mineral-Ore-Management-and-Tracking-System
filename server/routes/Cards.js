const express = require("express");
const router = express.Router();
const Mine = require("../models/MineSchema");
const Organization = require("../models/OrganizationSchema");
const Region = require("../models/RegionSchema");

router.get("/api/maps/officer", async (req, res) => {
  const { _id } = req.cookies;
  try {
    let mine_list;
    const region_response = await Region.findOne({
      _id: _id,
      type_of_region: type_of_region,
    }).select("state");
    if (type_of_region === "country") {
      mine_list = await Mine.find().distinct("location.coordinates");
    }
    if (type_of_region === "state") {
      const region_user = await Region.find({
        officer_id: { $exists: true },
        district: { $exists: true },
        state: region_response.state,
      }).distinct("_id");
      const region = await Mine.find({ region_id: region_user }).distinct(
        "location.coordinates"
      );
      mine_list = region;
    }
    if (type_of_region === "district") {
      mine_list = await Mine.find({
        region_id: _id,
      }).distinct("location.coordinates");
    }
    const mine_list_response = mine_list.map((mine) => {
      return {
        lat: mine.latitude,
        lng: mine.longitude,
      };
    });
    res.status(200).json(mine_list_response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
router.get("/api/cards/organization", async (req, res) => {
  const { _id } = req.cookies;
  try {
    const organization_response = await Organization.find().select(
      "ores_bought"
    );
    console.log(organization_response);
    res.status(200).json([
      {
        value: organization_response.length,
        title: "Total Number of Mines",
      },
    ]);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
