const express = require("express");
const router = express.Router();
const Transaction = require("../../models/TransactionSchema");
const CheckPoint = require("../../models/CheckPointSchema");

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

module.exports = router;
