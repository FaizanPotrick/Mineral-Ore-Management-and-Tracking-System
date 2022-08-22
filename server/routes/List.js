const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const MinedBatch = require("../models/MinedBatchSchema");
const Transaction = require("../models/TransactionSchema");

router.get("/api/officers/officer/country", async (req, res) => {
  const region_response = await Region.find({
    state: { $exists: true },
    officer_id: { $exists: true },
  })
    .select(["type_of_region", "country", "state", "district", "officer_id"])
    .lean();
  res.json(region_response);
});

router.get("/api/officers/officer/state", async (req, res) => {
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
  res.json(region_response);
});

router.get("/api/organisations/officer", async (req, res) => {
  const organisation_response = await Organisation.find().lean();
  res.json(organisation_response);
});

router.get("/api/mines/officer/country", async (req, res) => {
  const mine_response = await Mine.find().lean();
  res.json(mine_response);
});

router.get("/api/mines/officer/state", async (req, res) => {
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
  res.json(mine_response);
});

router.get("/api/mines/officer/district", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.find({
    region_id: _id,
  }).lean();
  res.json(mine_response);
});

router.get("/api/mines/organisation", async (req, res) => {
  const { _id } = req.cookies;
  const organization_response = await Mine.find({
    organization_id: _id,
  }).lean();
  res.json(organization_response);
});

router.get("/api/mined_batches/officer/district", async (req, res) => {
  const { _id } = req.cookies;
  const region_response = await Region.findById(_id).distinct("officer_id");
  const mined_batch_response = await MinedBatch.find({
    officer_id: region_response,
    status: {
      $ne: "testing",
    },
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(mined_batch_response);
});

router.get("/api/mined_batches/officer", async (req, res) => {
  const { mine_id } = req.query;
  const mined_batch_response = await MinedBatch.find({
    mine_id: mine_id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(mined_batch_response);
});

router.get("/api/mined_batches/organisation", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.find({ organisation_id: _id });
  const mined_batch_response = await MinedBatch.find({
    mine_id: mine_response._id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(mined_batch_response);
});

router.get("/api/mined_batches/miner", async (req, res) => {
  const { _id } = req.cookies;
  const mined_batch_response = await MinedBatch.find({
    mine_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(mined_batch_response);
});

router.get("/api/mined_batches/lab", async (req, res) => {
  const { _id } = req.cookies;
  const lab_response = await MinedBatch.find({
    lab_id: _id,
    status: "testing",
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(lab_response);
});

router.get("/api/transactions/officer", async (req, res) => {
  const { mine_id } = req.query;
  const transaction_response = await Transaction.find({
    mine_id: mine_id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(transaction_response);
});

router.get("/api/transactions/organisation", async (req, res) => {
  const { _id } = req.cookies;
  const transaction_response = await Transaction.find({
    org_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(transaction_response);
});

router.get("/api/transactions/miner", async (req, res) => {
  const { _id } = req.cookies;
  const transaction_response = await Transaction.find({
    mine_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(transaction_response);
});

module.exports = router;
