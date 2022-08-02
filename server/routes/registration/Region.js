const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
router.get("/api/region_coordinates", async (req, res) => {
  const { type_of_region, region_id } = req.cookies;
  try {
    const coordinates = await Region.findOne({
      _id: region_id,
      type_of_region: type_of_region,
    }).select("coordinates");
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
router.get("/api/region_list", async (req, res) => {
  const { type_of_region, region_id } = req.cookies;
  let region_check;
  try {
    const region_user = await Region.findOne({
      _id: region_id,
      type_of_region: type_of_region,
    });
    if (type_of_region === "country") {
      region_check = await Region.find({
        type_of_region: "state",
      }).select("state");
    }
    if (type_of_region === "state") {
      region_check = await Region.find({
        type_of_region: "district",
        state: region_user.state,
      }).select("district");
    }
    res.status(200).json(region_check);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
router.post("/api/registration/region/country", async (req, res) => {
  try {
    await Region.create({
      type_of_region: "country",
      coordinates: {
        latitude: 20.5937,
        longitude: 78.9629,
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
router.post("/api/registration/region/state", async (req, res) => {
  try {
    req.body.map(async (region) => {
      await Region.create({
        type_of_region: "state",
        state: region.state,
        coordinates: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      });
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
router.post("/api/registration/region/district", async (req, res) => {
  try {
    req.body.map(async (region) => {
      await Region.create({
        type_of_region: "district",
        state: region.state,
        district: region.district,
        coordinates: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      });
    });
    res.status(200).json({
      message: "Successfully Added",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
