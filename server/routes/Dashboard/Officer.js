const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Organisation = require("../../models/OrganisationSchema");
const Mine = require("../../models/MineSchema");

router.get("/api/dashboard/officer/country", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const region_response = await Region.find({
    state: { $exists: true },
    officer_id: { $exists: true },
  }).distinct("_id");
  const organisation_response = await Organisation.find().distinct("_id");
  const mine_response = await Mine.find().select("location.coordinates");
  const mine_list_response = mine_response.map((mine) => {
    return {
      _id: mine._id,
      coordinates: [
        mine.location.coordinates.longitude,
        mine.location.coordinates.latitude,
      ],
    };
  });
  res.json({
    cards: [
      {
        title: "Total Officers",
        value: region_response.length,
      },
      {
        title: "Total Organisations",
        value: organisation_response.length,
      },
      {
        title: "Total Mines",
        value: mine_response.length,
      },
    ],
    marker: mine_list_response,
  });
});
router.get("/api/dashboard/officer/state", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const region_user = await Region.findById(_id).distinct("state");
  const region_response = await Region.find({
    state: { $exists: true },
    officer_id: { $exists: true },
    state: region_user,
    district: { $exists: true },
  }).distinct("_id");
  const organisation_response = await Organisation.find().distinct("_id");
  const mine_response = await Mine.find({ region_id: region_response }).select(
    "location.coordinates"
  );
  const mine_list_response = mine_response.map((mine) => {
    return {
      _id: mine._id,
      coordinates: [
        mine.location.coordinates.longitude,
        mine.location.coordinates.latitude,
      ],
    };
  });
  res.json({
    cards: [
      {
        title: "Total Officers",
        value: region_response.length,
      },
      {
        title: "Total Organisations",
        value: organisation_response.length,
      },
      {
        title: "Total Mines",
        value: mine_response.length,
      },
    ],
    marker: mine_list_response,
  });
});
router.get("/api/dashboard/officer/district", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const region_user = await Region.findById(_id).select(["state", "district"]);
  const region_response = await Region.find({
    state: { $exists: true },
    officer_id: { $exists: true },
    state: region_user.state,
    district: region_user.district,
  }).distinct("_id");
  const mine_response = await Mine.find({ region_id: region_response }).select(
    "location.coordinates"
  );
  const mine_list_response = mine_response.map((mine) => {
    return {
      _id: mine._id,
      coordinates: [
        mine.location.coordinates.longitude,
        mine.location.coordinates.latitude,
      ],
    };
  });
  res.json({
    cards: [
      {
        title: "Total Mines",
        value: mine_response.length,
      },
    ],
    marker: mine_list_response,
  });
});
module.exports = router;
