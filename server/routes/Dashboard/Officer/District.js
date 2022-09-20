const express = require("express");
const router = express.Router();
const Mine = require("../../../models/MineSchema");
const Region = require("../../../models/RegionSchema");
const mongoose = require("mongoose");

router.get("/api/dashboard/officer/district", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const mine_response = await Mine.find({ region_id: _id }).distinct("_id");
  const mine_ids = mine_response.map((mine) => mine._id.toString());
  const response = await Region.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $addFields: {
        _id: {
          $toString: "$_id",
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
        localField: "_id",
        foreignField: "region_id",
        as: "mines",
      },
    },
    {
      $lookup: {
        from: "check points",
        localField: "_id",
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
      $lookup: {
        from: "transactions",
        pipeline: [
          {
            $match: {
              mine_id: {
                $in: mine_ids,
              },
              type_of_ore: "fine",
              grade: "high",
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(),
              },
            },
          },
        ],
        as: "fine_high",
      },
    },
    {
      $lookup: {
        from: "transactions",
        pipeline: [
          {
            $match: {
              mine_id: {
                $in: mine_ids,
              },
              type_of_ore: "fine",
              grade: "medium",
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(),
              },
            },
          },
        ],
        as: "fine_medium",
      },
    },
    {
      $lookup: {
        from: "transactions",
        pipeline: [
          {
            $match: {
              mine_id: {
                $in: mine_ids,
              },
              type_of_ore: "fine",
              grade: "low",
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(),
              },
            },
          },
        ],
        as: "fine_low",
      },
    },
    {
      $lookup: {
        from: "transactions",
        pipeline: [
          {
            $match: {
              mine_id: {
                $in: mine_ids,
              },
              type_of_ore: "lump",
              grade: "high",
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(),
              },
            },
          },
        ],
        as: "lump_high",
      },
    },
    {
      $lookup: {
        from: "transactions",
        pipeline: [
          {
            $match: {
              mine_id: {
                $in: mine_ids,
              },
              type_of_ore: "lump",
              grade: "medium",
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(),
              },
            },
          },
        ],
        as: "lump_medium",
      },
    },
    {
      $lookup: {
        from: "transactions",
        pipeline: [
          {
            $match: {
              mine_id: {
                $in: mine_ids,
              },
              type_of_ore: "lump",
              grade: "low",
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(),
              },
            },
          },
        ],
        as: "lump_low",
      },
    },
    {
      $project: {
        _id: 0,
        title: "district",
        cards: [
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
          {
            title: "Average High Region Price",
            value: {
              fine: { $avg: "$fine_high.price" },
              lump: { $avg: "$lump_high.price" },
            },
          },
          {
            title: "Average Medium Region Price",
            value: {
              fine: { $avg: "$fine_medium.price" },
              lump: { $avg: "$lump_medium.price" },
            },
          },
          {
            title: "Average Low Region Price",
            value: {
              fine: { $avg: "$fine_low.price" },
              lump: { $avg: "$lump_low.price" },
            },
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
