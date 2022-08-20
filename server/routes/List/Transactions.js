const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Mine = require("../../models/MineSchema");
const MinedBatch = require("../../models/MinedBatchSchema");
const Transaction = require("../../models/TransactionSchema");

router.get("/api/transactions", async (req, res) => {
  const { mine_id } = req.query;
  const transaction_response = await Transaction.find({
    mine_id: mine_id,
  });
  res.json(transaction_response);
});
router.get("/api/transactions/miner", async (req, res) => {
  const { _id } = req.cookies;
  const transaction_response = await Transaction.find({
    mine_id: _id,
  });
  res.json(transaction_response);
});
router.get("/api/transactions/organisation", async (req, res) => {
  const { _id } = req.cookies;
  const transaction_response = await Transaction.find({
    org_id: _id,
  });
  res.json(transaction_response);
});
router.get("/api/transaction", async (req, res) => {
  const { transaction_id } = req.query;
  const transaction_response = await Transaction.findById(transaction_id);
  res.status(200).json(transaction_response);
});
module.exports = router;