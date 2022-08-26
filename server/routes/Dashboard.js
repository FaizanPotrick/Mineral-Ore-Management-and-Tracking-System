const express = require("express");
const router = express.Router();
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const Region = require("../models/RegionSchema");
const MinedBatch = require("../models/MinedBatchSchema");
const Transaction = require("../models/TransactionSchema");
const CheckPoint = require("../models/CheckPointSchema");
const mongoose = require("mongoose");
const TransactionSchema = require("../models/TransactionSchema");

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
        localField: "region_ids",
        foreignField: "region_id",
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
        localField: "_id",
        foreignField: "region_id",
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

router.get("/api/dashboard/organisation", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.organisation_id) {
    _id = req.query.organisation_id;
  }
  const response = await Organisation.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $project: {
        _id: 0,
        title: "$organisation_name",
        cards: [
          {
            title: "Total High Ores Bought(in mt)",
            value: "$ores_bought.high",
          },
          {
            title: "Total Medium Ores Bought(in mt)",
            value: "$ores_bought.medium",
          },
          {
            title: "Total Low Ores Bought(in mt)",
            value: "$ores_bought.low",
          },
        ],
      },
    },
  ]);
  res.json(response[0]);
});

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
      },
    },
  ]);
  res.json(response[0]);
});

router.get("/api/dashboard/checkpoint", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.checkpoint_id) {
    _id = req.query.checkpoint_id;
  }
  const checkpoint_response = await CheckPoint.findById(_id).lean();
  const transaction_response = await Transaction.find({
    _id: checkpoint_response.transactions,
  }).lean();
  res.json(transaction_response);
});

router.get("/api/dashboard/lab", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.lab_id) {
    _id = req.query.lab_id;
  }
  const response = await Transaction.find({
    lab_id: _id,
  })
    .sort({
      updatedAt: -1,
    })
    .lean();

  res.json(response);
});

module.exports = router;
