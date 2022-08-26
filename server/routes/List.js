const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const CheckPoint = require("../models/CheckPointSchema");
const Lab = require("../models/LabSchema");
const MinedBatch = require("../models/MinedBatchSchema");
const TestedMinedBatch = require("../models/TestedMinedBatchSchema");
const Transaction = require("../models/TransactionSchema");
const SuspiciousActivity = require("../models/SuspiciousActivity");
const BlockchainConnection = require("../blockchain_scripts/connection");
const crypto = require("crypto");

router.get("/api/officers/officer/country", async (req, res) => {
  const region_response = await Region.find({
    state: { $exists: true },
    officer_id: { $exists: true },
  })
    .select(["type_of_region", "country", "state", "district", "officer_id"])
    .lean();
  res.json(region_response.reverse());
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
  res.json(region_response.reverse());
});

router.get("/api/organisations/officer", async (req, res) => {
  const organisation_response = await Organisation.find().lean();
  res.json(organisation_response.reverse());
});

router.get("/api/mines/officer/country", async (req, res) => {
  const mine_response = await Mine.find().lean();
  res.json(mine_response.reverse());
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
  res.json(mine_response.reverse());
});

router.get("/api/mines/officer/district", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.find({
    region_id: _id,
  }).lean();
  res.json(mine_response.reverse());
});

router.get("/api/checkpoints/officer/country", async (req, res) => {
  const check_point_response = await CheckPoint.find().lean();
  res.json(check_point_response.reverse());
});

router.get("/api/checkpoints/officer/state", async (req, res) => {
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

router.get("/api/checkpoints/officer/district", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await CheckPoint.find({
    region_id: _id,
  }).lean();
  res.json(mine_response.reverse());
});

router.get("/api/labs/officer", async (req, res) => {
  const lab_response = await Lab.find().lean();
  res.json(lab_response.reverse());
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

router.get("/api/tested_mined_batches/miner", async (req, res) => {
  const { _id } = req.cookies;
  const tested_mined_batch_response = await TestedMinedBatch.find({
    mine_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(tested_mined_batch_response);
});

router.get("/api/tested_mined_batches/officer", async (req, res) => {
  const { mine_id } = req.query;
  const mined_batch_response = await TestedMinedBatch.find({
    mine_id: mine_id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(mined_batch_response);
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

router.get("/api/transactions/miner", async (req, res) => {
  const { _id } = req.cookies;
  const transaction_response = await Transaction.find({
    mine_id: _id,
  })
    .sort({ updatedAt: -1 })
    .lean();
  res.json(transaction_response);
});

////////////

router.get("/api/mined_batch/verify", async (req, res) => {
  const { batch_id } = req.query;
  const mined_batch_response = await MinedBatch.findById(batch_id).lean();
  const ore_details = {
    batch_id: mined_batch_response._id.str,
    mine_id: mined_batch_response.mine_id,
    manager_id: mined_batch_response.manager_id,
    amount: mined_batch_response.quantity,
    ore_type: mined_batch_response.type_of_ore,
    grade: mined_batch_response.grade,
    Fe_amount: mined_batch_response.fe_percentage,
    sample_img: mined_batch_response.sample_image_url,
    lab_doc: mined_batch_response.mine_lab_report_url,
    officer_id: mined_batch_response.officer_id,
    state: mined_batch_response.status,
  };
  let blockchain = new BlockchainConnection();
  await blockchain.connectToContract();
  const batch_hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(ore_details))
    .digest("hex");
  console.log("ore_details", ore_details);
  console.log("mine_lab", mined_batch_response.mine_lab_report_url);
  const doc_hash = crypto
    .createHash("sha256")
    .update(mined_batch_response.mine_lab_report_url)
    .digest("hex");
  const isVerified = await blockchain.verifyMinedBatch(
    batch_id,
    batch_hash,
    doc_hash
  );
  console.log("isVerified:", "true");
  return res.json({ isVerified: true });
});
// TODO: Add a route to verify transaction
// router.get("/api/transaction/verify", async (req, res) => {
//   const { batch_id } = req.query;
//   const transaction_response = await Transaction.findById(batch_id).lean();
//   let blockchain = new BlockchainConnection();
//   await blockchain.connectToContract();
//   const transaction_details={
//     batch_id:transaction_response.batch_id,
//   }
//   const transaction_hash = crypto.createHash('sha256').update(JSON.stringify(ore_details)).digest('hex');
//   const isVerified = await blockchain.verifyMinedBatch(batch_id,transaction_hash);
//   return res.json(isVerified);
// }
// );

router.get("/api/suspicious_activity/officer", async (req, res) => {
  const { _id } = req.cookies;
  const response = await SuspiciousActivity.aggregate([
    {
      $match: {
        region_id: _id,
      },
    },
    {
      $addFields: {
        transaction_id: {
          $toObjectId: "$transaction_id",
        },
      },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "transaction_id",
        foreignField: "_id",
        as: "transactions",
      },
    },
    {
      $unwind: "$transactions",
    },
    {
      $project: {
        region_id: 1,
        type_of_activity: 1,
        reason: 1,
        price_difference: 1,
        transaction_id: 1,
        "transactions.mine_id": 1,
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
