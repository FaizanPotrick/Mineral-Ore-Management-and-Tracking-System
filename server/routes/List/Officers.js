const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");

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
module.exports = router;
