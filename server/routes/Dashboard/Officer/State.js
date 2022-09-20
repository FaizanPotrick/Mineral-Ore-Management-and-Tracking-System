const express = require("express");
const router = express.Router();
const Region = require("../../../models/RegionSchema");
const mongoose = require("mongoose");

router.get("/api/dashboard/officer/state", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const response = await Region.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
        state: { $exists: true },
      },
    },
    {
      $lookup: {
        from: "regions",
        localField: "state",
        foreignField: "state",
        pipeline: [
          {
            $match: {
              district: { $exists: true },
              officer_id: { $exists: true },
            },
          },
        ],
        as: "states",
      },
    },
    {
      $addFields: {
        region_ids: {
          $map: {
            input: "$states",
            as: "state",
            in: {
              $toString: "$$state._id",
            },
          },
        },
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
        localField: "region_ids",
        foreignField: "region_id",
        as: "mines",
      },
    },
    {
      $lookup: {
        from: "check points",
        localField: "region_ids",
        foreignField: "region_id",
        as: "check points",
      },
    },
    {
      $lookup: {
        from: "labs",
        pipeline: [
          {
            $match: {
              _id: {
                $exists: true,
              },
            },
          },
        ],
        as: "labs",
      },
    },
    {
      $project: {
        _id: 0,
        title: "state",
        cards: [
          {
            title: "Total Officers",
            value: { $size: "$states" },
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
