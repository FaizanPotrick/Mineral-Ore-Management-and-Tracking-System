const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Region = require("../../models/RegionSchema");

router.get("/api/mines/officer/country", async (req, res) => {
  const mine_response = await Mine.find();
  res.json(mine_response);
});
router.get("/api/mines/officer/state", async (req, res) => {
  const { _id, type_of_region } = req.cookies;
  const region_user = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).distinct("state");
  const region_response = await Region.find({
    officer_id: { $exists: true },
    district: { $exists: true },
    state: region_user,
  }).distinct("_id");
  const mine_response = await Mine.find({ region_id: region_response });
  res.json(mine_response);
});
router.get("/api/mines/officer/district", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.find({
    region_id: _id,
  });
  res.json(mine_response);
});

router.get("/api/mines/organisation", async (req, res) => {
  const { _id } = req.cookies;
  const organization_response = await Mine.find({
    organization_id: _id,
  });
  res.json(organization_response);
});
module.exports = router;
