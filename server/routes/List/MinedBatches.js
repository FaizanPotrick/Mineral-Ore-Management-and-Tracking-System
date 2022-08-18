const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Mine = require("../../models/MineSchema");
const MinedBatch = require("../../models/MinedBatchSchema");

router.get("/api/mined_batches/officer/district", async (req, res) => {
  const { auth } = req.cookies;
  const region_response = await Region.findOne({
    auth: auth,
  }).distinct("user_id");
  const mined_batch_response = await MinedBatch.find({
    officer_id: region_response,
    status: "pendding",
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
router.get("/api/mined_batch", async (req, res) => {
  const { batch_id } = req.query;
  const mined_batch_response = await MinedBatch.findById(batch_id);
  res.status(200).json(mined_batch_response);
});
module.exports = router;
