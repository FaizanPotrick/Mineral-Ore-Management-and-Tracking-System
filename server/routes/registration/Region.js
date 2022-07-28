const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
router.get("/api/registration/region", async (req, res) => {
  try {
    const states = await Region.find({
      state: { $exists: true },
      district: { $exists: false },
    }).select("state");
    const districts = await Region.find({ district: { $exists: true } }).select(
      ["state", "district"]
    );
    res.status(200).json({ states, districts });
  } catch (error) {
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
