const express = require("express");
const router = express.Router();
const Transaction = require("../../models/TransactionSchema");

router.get("/api/dashboard/lab", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.lab_id) {
    _id = req.query.lab_id;
  }
  const response = await Transaction.find({
    lab_id: _id,
  })
    .sort({
      updatedAt: -1,
    })
    .lean();

  res.json(response);
});

module.exports = router;
