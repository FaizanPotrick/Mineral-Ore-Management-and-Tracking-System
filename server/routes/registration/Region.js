const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const ShortUniqueId = require("short-unique-id");

router.get("/api/registration/region", async (req, res) => {
  try {
    const regions = await Region.find();
    res.status(200).json({
      message: "Successfully Added",
      type: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
router.post("/api/registration/region", async (req, res) => {
  const { type_of_region, state_name, district_name, coordinates } = req.body;
  try {
    const region_id_generate = new ShortUniqueId({
      length: 15,
    });
    const region_id = region_id_generate();
    await Region.create({
      region_id: region_id,
      type_of_region: type_of_region,
      state_name: state_name,
      district_name: district_name,
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });
    res.status(200).json({
      message: "Successfully Added",
      type: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
