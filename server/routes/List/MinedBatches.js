const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Mine = require("../../models/MineSchema");
const MinedBatch = require("../../models/MinedBatchSchema");
const Lab = require("../../models/LabSchema");

router.get("/api/mined_batches/officer/district", async (req, res) => {
  const { _id } = req.cookies;
  const region_response = await Region.findById(_id).distinct("officer_id");
  const mined_batch_response = await MinedBatch.find({
    officer_id: region_response,
    status: "pending",
  });
  res.json(mined_batch_response);
});
router.get("/api/mined_batches/officer", async (req, res) => {
  const { mine_id } = req.query;
  const mined_batch_response = await MinedBatch.find({
    mine_id: mine_id,
  });
  res.json(mined_batch_response);
});
router.get("/api/mined_batches/miner", async (req, res) => {
  const { _id } = req.cookies;
  const mined_batch_response = await MinedBatch.find({
    mine_id: _id,
  });
  res.json(mined_batch_response);
});
router.get("/api/mined_batches/organisation", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.find({ organisation_id: _id });
  const mined_batch_response = await MinedBatch.find({
    mine_id: mine_response._id,
  });
  res.json(mined_batch_response);
});

router.get("/api/mined_batches/lab", async (req, res) => {
  const { _id } = req.cookies;
  const lab_response = await MinedBatch.find({
    lab_id: _id,
    status: "testing",
  }).lean();
  res.json(lab_response);
});

router.get("/api/mined_batches/lab_list", async (req, res) => {
  const lab_response = await Lab.find().select("lab_name");
  res.json(lab_response);
});

router.get("/api/mined_batch", async (req, res) => {
  const { batch_id } = req.query;
  const mined_batch_response = await MinedBatch.findById(batch_id);
  res.status(200).json(mined_batch_response);
});
module.exports = router;
