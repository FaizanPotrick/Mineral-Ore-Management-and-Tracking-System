const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");

router.post("/api/registration/region/country", async (req, res) => {
  try {
    await Region.create({
      type_of_region: "country",
      coordinates: {
        latitude: 20.5937,
        longitude: 78.9629,
      },
    });
    res.status(200).json("Successfully Added");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
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
    res.status(200).json("Successfully Added");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
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
    res.status(200).json("Successfully Added");
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
  }
});

module.exports = router;
