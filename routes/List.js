const express = require("express");
const { Types } = require("mongoose");

const Region = require("../models/Region");
const Organization = require("../models/Organization");
const Mine = require("../models/Mine");
const CheckPoint = require("../models/CheckPoint");
const Lab = require("../models/Lab");
const MinedBatch = require("../models/MinedBatch");
const TestedMinedBatch = require("../models/TestedMinedBatch");
const Transaction = require("../models/Transaction");
const Suspicious = require("../models/Suspicious");

const router = express.Router();

router.get("/api/government/officers/country", async (req, res) => {
  const region_response = await Region.find({
    state: { $exists: true },
    officer_id: { $exists: true },
  })
    .select(["type_of_region", "country", "state", "district", "officer_id"])
    .lean();
  res.json(region_response.reverse());
});

router.get("/api/government/officers/state", async (req, res) => {
  const { _id } = req.cookies;
  const region_user = await Region.findById(_id).distinct("state");
  const region_response = await Region.find({
    state: { $exists: true },
    district: { $exists: true },
    officer_id: { $exists: true },
    state: region_user,
  })
    .select(["type_of_region", "country", "state", "district", "officer_id"])
    .lean();
  res.json(region_response.reverse());
});

router.get("/api/government/organizations", async (req, res) => {
  const organization_response = await Organization.find().lean();
  res.json(organization_response.reverse());
});

router.get("/api/government/mines/country", async (req, res) => {
  const mine_response = await Mine.find().lean();
  res.json(mine_response.reverse());
});

router.get("/api/government/mines/state", async (req, res) => {
  const { _id, type_of_region } = req.cookies;
  const region_user = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).distinct("state");
  const region_response = await Region.find({
    officer_id: { $exists: true },
    district: { $exists: true },
    state: region_user,
  }).distinct("_id");
  const mine_response = await Mine.find({ region_id: region_response }).lean();
  res.json(mine_response.reverse());
});

router.get("/api/government/mines/district", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.find({
    region_id: _id,
  }).lean();
  res.json(mine_response.reverse());
});

router.get("/api/government/checkpoints/country", async (req, res) => {
  const check_point_response = await CheckPoint.find().lean();
  res.json(check_point_response.reverse());
});

router.get("/api/government/checkpoints/state", async (req, res) => {
  const { _id, type_of_region } = req.cookies;
  const region_user = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).distinct("state");
  const region_response = await Region.find({
    officer_id: { $exists: true },
    district: { $exists: true },
    state: region_user,
  }).distinct("_id");
  const check_point_response = await CheckPoint.find({
    region_id: region_response,
  }).lean();
  res.json(check_point_response.reverse());
});

router.get("/api/government/checkpoints/district", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await CheckPoint.find({
    region_id: _id,
  }).lean();
  res.json(mine_response.reverse());
});

router.get("/api/government/labs", async (req, res) => {
  const lab_response = await Lab.find().lean();
  res.json(lab_response.reverse());
});

router.get("/api/mine/mined_batches", async (req, res) => {
  const { _id } = req.cookies;
  const mined_batch_response = await MinedBatch.find({
    mine_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(mined_batch_response);
});

router.get("/api/mine/tested_mined_batches", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.mine_id) {
    _id = req.query.mine_id;
  }
  const tested_mined_batch_response = await TestedMinedBatch.find({
    mine_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(tested_mined_batch_response);
});

router.get("/api/mine/tested_mined_batch", async (req, res) => {
  const { batch_id } = req.query;
  const batch_response = await TestedMinedBatch.findById(batch_id).lean();
  res.status(200).json(batch_response);
});

router.get("/api/mine/transactions", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.mine_id) {
    _id = req.query.mine_id;
  }
  const transaction_response = await Transaction.find({
    mine_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(transaction_response);
});

router.get("/api/mine/transaction", async (req, res) => {
  const { transaction_id } = req.query;
  const response = await Transaction.aggregate([
    {
      $match: {
        _id: Types.ObjectId(transaction_id),
      },
    },
    {
      $addFields: {
        mine_id: {
          $toObjectId: "$mine_id",
        },
        buyer_org_id: {
          $toObjectId: "$buyer_org_id",
        },
      },
    },
    {
      $lookup: {
        from: "mines",
        localField: "mine_id",
        foreignField: "_id",
        as: "mine",
      },
    },
    {
      $unwind: "$mine",
    },
    {
      $addFields: {
        mine_name: "$mine.mine_name",
      },
    },
    {
      $lookup: {
        from: "organizations",
        localField: "buyer_org_id",
        foreignField: "_id",
        as: "organization",
      },
    },
    {
      $unwind: "$organization",
    },
    {
      $addFields: {
        buyer_org_name: "$organization.organization_name",
      },
    },
  ]);
  res.status(200).json(response[0]);
});

router.get("/api/government/suspicious", async (req, res) => {
  const { _id } = req.cookies;
  const response = await Suspicious.aggregate([
    {
      $match: {
        region_id: _id,
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

router.get("/api/transaction/suspicious", async (req, res) => {
  const { transaction_id } = req.query;
  const response = await Suspicious.find({
    transaction_id: transaction_id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  if (response.length === 0) {
    res.status(404).send("No Suspicious Found");
  }
  res.json(response);
});

router.get("/api/region/country", async (req, res) => {
  const region_response = await Region.find({
    type_of_region: "state",
  }).distinct("state");
  res.status(200).json(region_response);
});

router.get("/api/region/state", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_user = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  })
    .select("state")
    .lean();
  const region_response = await Region.find({
    type_of_region: "district",
    state: region_user.state,
  }).distinct("district");
  res.status(200).json(region_response);
});

router.get("/api/region/coordinates", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_response = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  })
    .distinct("coordinates")
    .lean();
  res.status(200).json(region_response[0]);
});

router.get("/api/transaction/organizations", async (req, res) => {
  const organization_response = await Organization.find()
    .select("organization_name")
    .lean();
  res.status(200).json(organization_response);
});

module.exports = router;
