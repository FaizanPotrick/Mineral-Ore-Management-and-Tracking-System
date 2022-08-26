const express = require("express");
const router = express.Router();
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const Region = require("../models/RegionSchema");
const MinedBatch = require("../models/MinedBatchSchema");
const Transaction = require("../models/TransactionSchema");
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
              createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                $lte: new Date(),
              },
            },
          },
        ],
        as: "transactions",
      },
    },
    {
      $project: {
        _id: 0,
        title: "district",
        cards: [
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
            title: "Average Region Price",
            value: { $avg: "$transactions.price" },
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
      $addFields: {
        _id: {
          $toString: "$_id",
        },
      },
    },
    {
      $lookup: {
        from: "mines",
        localField: "_id",
        foreignField: "organisation_id",
        as: "mines",
      },
    },
    {
      $project: {
        _id: 0,
        title: "$organisation_name",
        cards: [
          {
            title: "Total Mines",
            value: { $size: "$mines" },
          },
          {
            title: "Total Fine Ores Bought(in mt)",
            value: "$ores_bought.fine",
          },
          {
            title: "Total Lump Ores Bought(in mt)",
            value: "$ores_bought.lump",
          },
          {
            title: "Total Iron Pellet Ores Bought(in mt)",
            value: "$ores_bought.iron_pellet",
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
      $project: {
        _id: 0,
        title: "Darshika Pongallu",
        cards: [
          {
            title: "Mine Area(in sq.)",
            value: "$area",
          },
          {
            title: "Total High Ores Available(in mt)",
            value: "$warehouse.ores_available.high",
          },
          {
            title: "Total Low Ores Available(in mt)",
            value: "$warehouse.ores_available.medium",
          },
          {
            title: "Total Medium Ores Available(in mt)",
            value: "$warehouse.ores_available.low",
          },
          {
            title: "Lease Period",
            value: "$lease_period.to",
          },
        ],
      },
    },
  ]);
  res.json(response[0]);
  // check: { $push: "$transactions.type_of_ore" },
});

router.get("/api/dashboard/checkpoint", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.checkpoint_id) {
    _id = req.query.checkpoint_id;
  }
  const response = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $in: [_id, "$checkpoints"],
        },
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);
  res.json(response);
});

router.get("/api/dashboard/lab", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.lab_id) {
    _id = req.query.lab_id;
  }
  const response = await MinedBatch.aggregate([
    {
      $match: {
        lab_id: _id,
        status: {
          $ne: "testing",
        },
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);
  res.json(response);
});

module.exports = router;
