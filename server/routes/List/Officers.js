const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Organisation = require("../../models/OrganisationSchema");

router.get("/api/officers/officer/country", async (req, res) => {
  const region_response = await Region.find({
    state: { $exists: true },
    officer_id: { $exists: true },
  }).select(["type_of_region", "country", "state", "district", "officer_id"]);
  res.json(region_response);
});

router.get("/api/officers/officer/state", async (req, res) => {
  let _id = req.cookies._id;
  const region_user = await Region.findById(_id).distinct("state");
  const region_response = await Region.find({
    state: { $exists: true },
    district: { $exists: true },
    officer_id: { $exists: true },
    state: region_user,
  }).select(["type_of_region", "country", "state", "district", "officer_id"]);
  res.json(region_response);
});

router.get("/api/officers/list/country", async (req, res) => {
  const region_response = await Region.find({
    type_of_region: "state",
  }).distinct("state");
  res.status(200).json(region_response);
});

router.get("/api/officers/list/state", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_user = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).select("state");
  const region_response = await Region.find({
    type_of_region: "district",
    state: region_user.state,
  }).distinct("district");
  res.status(200).json(region_response);
});

router.get(
  "/api/region_coordinates_and_organisation_list",
  async (req, res) => {
    const { type_of_region, _id } = req.cookies;
    const region_response = await Region.findOne({
      _id: _id,
      type_of_region: type_of_region,
    }).distinct("coordinates");
    const organisation_response = await Organisation.find().select(
      "organisation_name"
    );
    res.status(200).json({
      coordinates: region_response[0],
      organisations: organisation_response,
    });
  }
);

module.exports = router;
