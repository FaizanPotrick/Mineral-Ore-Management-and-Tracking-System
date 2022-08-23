const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const Lab = require("../models/LabSchema");

router.get("/api/region/country", async (req, res) => {
  const region_response = await Region.find({
    type_of_region: "state",
  }).distinct("state");
  res.status(200).json(region_response);
});

router.get("/api/region/state", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_user = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  })
    .select("state")
    .lean();
  const region_response = await Region.find({
    type_of_region: "district",
    state: region_user.state,
  }).distinct("district");
  res.status(200).json(region_response);
});

router.get("/api/mined_batch/lab_list", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.findById(_id).distinct("region_id");
  const lab_response = await Lab.find({
    region_id: mine_response[0],
  })
    .select("lab_name")
    .lean();
  res.json(lab_response);
});

router.get("/api/transaction/organisation_list", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.findById(_id).lean();
  const organisation_response = await Organisation.find({
    _id: { $nin: mine_response.organisation_id },
  })
    .select("organisation_name")
    .lean();
  res.status(200).json(organisation_response);
});

router.get("/api/coordinates_and_organisation_list", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_response = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).distinct("coordinates");
  const organisation_response = await Organisation.find()
    .select("organisation_name")
    .lean();
  res.status(200).json({
    coordinates: region_response[0],
    organisations: organisation_response,
  });
});

module.exports = router;
