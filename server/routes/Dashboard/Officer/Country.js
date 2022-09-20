const express = require("express");
const router = express.Router();
const Region = require("../../../models/RegionSchema");
const mongoose = require("mongoose");

router.get("/api/dashboard/officer/country", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const response = await Region.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "regions",
        pipeline: [
          {
            $match: {
              state: { $exists: true },
              officer_id: { $exists: true },
            },
          },
        ],
        as: "officers",
      },
    },
    {
      $lookup: {
        from: "organisations",
        pipeline: [
          {
            $match: {
              _id: { $exists: true },
            },
          },
        ],
        as: "organisations",
      },
    },
    {
      $lookup: {
        from: "mines",
        pipeline: [
          {
            $match: {
              _id: { $exists: true },
            },
          },
        ],
        as: "mines",
      },
    },
    {
      $lookup: {
        from: "check points",
        pipeline: [
          {
            $match: {
              _id: { $exists: true },
            },
          },
        ],
        as: "check points",
      },
    },
    {
      $lookup: {
        from: "labs",
        pipeline: [
          {
            $match: {
              _id: { $exists: true },
            },
          },
        ],
        as: "labs",
      },
    },
    {
      $project: {
        _id: 0,
        title: "central",
        cards: [
          {
            title: "Total Officers",
            value: { $size: "$officers" },
          },
          {
            title: "Total Organisations",
            value: { $size: "$organisations" },
          },
          {
            title: "Total Mines",
            value: { $size: "$mines" },
          },
          {
            title: "Total Check Points",
            value: { $size: "$check points" },
          },
          {
            title: "Total Labs",
            value: { $size: "$labs" },
          },
        ],
        markers: {
          $map: {
            input: "$mines",
            as: "mine",
            in: {
              _id: "$$mine._id",
              coordinates: [
                "$$mine.location.coordinates.longitude",
                "$$mine.location.coordinates.latitude",
              ],
            },
          },
        },
      },
    },
  ]);
  res.json(response[0]);
});

module.exports = router;
