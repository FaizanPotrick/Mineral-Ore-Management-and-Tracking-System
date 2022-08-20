const express = require("express");
const router = express.Router();
const Transaction = require("../../models/TransactionSchema");
const bcrypt = require("bcrypt");

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
router.get("/api/transaction/verify", async (req, res) => {
  const { transaction_id, transaction_hash } = req.query;
  const transaction_response = await Transaction.findOne({
    _id: transaction_id,
    status: "dispatched",
  }).lean();
  if (transaction_response === null) {
    res.status(201).json({
      message: "Transaction not found",
      type: "error",
    });
  }
  const hashMatch = bcrypt.compare(
    JSON.stringify({
      mine_id: transaction_response.mine_id,
      manager_id: transaction_response.manager_id,
      ceo_id: transaction_response.ceo_id,
      buyer_org_id: transaction_response.buyer_org_id,
      type_of_ore: transaction_response.type_of_ore,
      fe_percentage: transaction_response.fe_percentage,
      grade: transaction_response.grade,
      quantity: transaction_response.quantity,
      price: transaction_response.price,
    }),
    transaction_hash
  );
  if (!hashMatch) {
    return res.status(201).json({
      message: "Transaction hash does not match",
      type: "error",
    });
  }
  res.status(200).json(transaction_response);
});

module.exports = router;
