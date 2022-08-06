const express = require("express");
const router = express.Router();
const Mine = require("../models/MineSchema");
const Region = require("../models/RegionSchema");

router.get("/api/maps/officer", async (req, res) => {
  const { _id, type_of_region } = req.cookies;
  try {
    let mine_list;
    if (type_of_region === "country") {
      mine_list = await Mine.find().distinct("location.coordinates");
    }
    if (type_of_region === "state") {
      const region_response = await Region.findOne({
        _id: _id,
        type_of_region: type_of_region,
      }).select("state");
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
router.get("/api/maps/organization", async (req, res) => {
  const { _id } = req.cookies;
  try {
    const organization_response = await Mine.find({
      organization_id: _id,
    }).distinct("location.coordinates");
    const mine_list_response = organization_response.map((mine) => {
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
module.exports = router;
