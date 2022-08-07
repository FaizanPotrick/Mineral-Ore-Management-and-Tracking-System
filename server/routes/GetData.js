const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organization = require("../models/OrganizationSchema");
const Mine = require("../models/MineSchema");
const User = require("../models/UserSchema");

router.get("/api/user_details", async (req, res) => {
  const { auth } = req.cookies;
  const user_response = await User.findOne({ auth: auth }).select([
    "user_name",
    "email_address",
  ]);
  res.json(user_response);
});
router.get("/api/name", async (req, res) => {
  const { _id, type_of_user } = req.cookies;
  if (type_of_user === "organization") {
    const organization_response = await Organization.findById(_id).distinct(
      "organization_name"
    );
    return res.json(organization_response[0]);
  }
  if (type_of_user === "miner") {
    const mine_response = await Mine.findById(_id).distinct("organization_id");
    const organization_response = await Organization.findById(
      mine_response
    ).distinct("organization_name");
    return res.json(organization_response[0]);
  }
});
router.get("/api/region_coordinates", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_response = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).select("coordinates");
  res.status(200).json(region_response);
});
router.get("/api/organization_list", async (req, res) => {
  const organization_response = await Organization.find().select(
    "organization_name"
  );
  res.json(organization_response);
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
