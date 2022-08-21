const express = require("express");
const router = express.Router();
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const Region = require("../models/RegionSchema");
const CheckPoint = require("../models/CheckPointSchema");
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
      $project: {
        _id: 0,
        title: "district",
        cards: [
          {
            title: "Total Mines",
            value: { $size: "$mines" },
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
        organisation_id: {
          $toObjectId: "$organisation_id",
        },
      },
    },
    {
      $lookup: {
        from: "organisations",
        localField: "organisation_id",
        foreignField: "_id",
        as: "organisation",
      },
    },
    {
      $unwind: "$organisation",
    },
    {
      $project: {
        _id: 0,
        title: "$organisation.organisation_name",
        cards: [
          {
            title: "Mine Area(in sq.)",
            value: "$area",
          },
          {
            title: "Warehouse Capacity(in mt)",
            value: "$warehouse_capacity",
          },
          {
            title: "Total Fine Ores Available(in mt)",
            value: "$ores_available.fine",
          },
          {
            title: "Total Lump Ores Available(in mt)",
            value: "$ores_available.lump",
          },
          {
            title: "Total Iron Pellet Ores Available(in mt)",
            value: "$ores_available.iron_pellet",
          },
          {
            title: "Lease Period",
            value: "$lease_period.to",
          },
        ],
        doughnut: {
          labels: ["Fine", "Lump", "Iron Pellet", "Empty"],
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#E48665"],
              data: [
                {
                  $sum: [
                    "$ores_available.fine.high",
                    "$ores_available.fine.medium",
                    "$ores_available.fine.low",
                  ],
                },
                {
                  $sum: [
                    "$ores_available.lump.high",
                    "$ores_available.lump.medium",
                    "$ores_available.lump.low",
                  ],
                },
                {
                  $sum: [
                    "$ores_available.iron_pellet.high",
                    "$ores_available.iron_pellet.medium",
                    "$ores_available.iron_pellet.low",
                  ],
                },
                {
                  $subtract: [
                    "$warehouse_capacity",
                    {
                      $add: [
                        { $sum: "$ores_available.fine" },
                        { $sum: "$ores_available.lump" },
                        { $sum: "$ores_available.iron_pellet" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
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
  const response = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $in: [_id, "$checkpoints"],
        },
      },
    },
  ]);
  res.json(response);
});

module.exports = router;
