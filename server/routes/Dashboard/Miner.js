const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Transaction = require("../../models/TransactionSchema");
const CheckPoint = require("../../models/CheckPointSchema");
const mongoose = require("mongoose");

router.get("/api/dashboard/miner", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.mine_id) {
    _id = req.query.mine_id;
  }
  const response = await Mine.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $addFields: {
        mine_id: {
          $toString: "$_id",
        },
      },
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "mine_id",
        foreignField: "mine_id",
        as: "warehouse",
      },
    },
    {
      $unwind: "$warehouse",
    },
    {
      $lookup: {
        from: "transactions",
        pipeline: [
          {
            $match: {
              mine_id: _id,
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
              mine_id: _id,
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
              mine_id: _id,
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
              mine_id: _id,
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
              mine_id: _id,
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
              mine_id: _id,
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
        title: "$mine_name",
        cards: [
          {
            title: "Mine Area(in Sq.KM)",
            value: "$area",
          },
          {
            title: "Total High Ores Available(in mt)",
            value: "$warehouse.ores_available.high",
          },
          {
            title: "Total Medium Ores Available(in mt)",
            value: "$warehouse.ores_available.medium",
          },
          {
            title: "Total Low Ores Available(in mt)",
            value: "$warehouse.ores_available.low",
          },
          {
            title: "Lease Period",
            value: "$lease_period.to",
          },
          {
            title: "Average High Mine Price",
            value: {
              fine: { $avg: "$fine_high.price" },
              lump: { $avg: "$lump_high.price" },
            },
          },
          {
            title: "Average Medium Mine Price",
            value: {
              fine: { $avg: "$fine_medium.price" },
              lump: { $avg: "$lump_medium.price" },
            },
          },
          {
            title: "Average Low Mine Price",
            value: {
              fine: { $avg: "$fine_low.price" },
              lump: { $avg: "$lump_low.price" },
            },
          },
          {
            title: "Total ROM",
            value: "$rom",
          },
        ],
      },
    },
  ]);
  res.json(response[0]);
});

module.exports = router;
