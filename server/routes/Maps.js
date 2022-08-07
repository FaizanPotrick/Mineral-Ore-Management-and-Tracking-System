const express = require("express");
const router = express.Router();
const Mine = require("../models/MineSchema");
const Region = require("../models/RegionSchema");

router.get("/api/maps/officer", async (req, res) => {
  const { _id, type_of_region } = req.cookies;
  let mine_list;
  if (type_of_region === "country") {
    mine_list = await Mine.find().select("location.coordinates");
  }
  if (type_of_region === "state") {
    const region_response = await Region.findOne({
      _id: _id,
      type_of_region: type_of_region,
    }).distinct("state");
    const region_user = await Region.find({
      officer_id: { $exists: true },
      district: { $exists: true },
      state: region_response,
    }).distinct("_id");
    mine_list = await Mine.find({ region_id: region_user }).select(
      "location.coordinates"
    );
  }
  if (type_of_region === "district") {
    mine_list = await Mine.find({
      region_id: _id,
    }).select("location.coordinates");
  }
  const mine_list_response = mine_list.map((mine) => {
    return {
      _id: mine._id,
      coordinates: [
        mine.location.coordinates.longitude,
        mine.location.coordinates.latitude,
      ],
    };
  });
  res.json(mine_list_response);
});
router.get("/api/maps/organization", async (req, res) => {
  const { _id } = req.cookies;
  const organization_response = await Mine.find({
    organization_id: _id,
  }).select("location.coordinates");
  const mine_list_response = organization_response.map((mine) => {
    return {
      _id: mine._id,
      coordinates: [
        mine.location.coordinates.longitude,
        mine.location.coordinates.latitude,
      ],
    };
  });
  res.json(mine_list_response);
});
module.exports = router;
