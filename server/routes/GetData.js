const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organisation = require("../models/OrganisationSchema");

router.get("/api/region_coordinates", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_response = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).select("coordinates");
  res.status(200).json(region_response);
});
router.get("/api/organisation_list", async (req, res) => {
  const organisation_response = await Organisation.find().select(
    "organisation_name"
  );
  res.json(organisation_response);
});
router.get("/api/region_coordinates", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_response = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).select("coordinates");
  res.status(200).json(region_response);
});
router.get("/api/region_list", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  if (type_of_region === "country") {
    const region_response = await Region.find({
      type_of_region: "state",
    }).distinct("state");
    res.status(200).json(region_response);
  }
  if (type_of_region === "state") {
    const region_user = await Region.findOne({
      _id: _id,
      type_of_region: type_of_region,
    }).select("state");
    const region_response = await Region.find({
      type_of_region: "district",
      state: region_user.state,
    }).distinct("district");
    res.status(200).json(region_response);
  }
});
module.exports = router;
