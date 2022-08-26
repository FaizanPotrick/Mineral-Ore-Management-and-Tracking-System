const express = require("express");
const router = express.Router();
const TestedMinedBatch = require("../models/TestedMinedBatchSchema");
const Transaction = require("../models/TransactionSchema");
const Warehouse = require("../models/WarehouseSchema");
const bcrypt = require("bcrypt");

router.get("/api/tested_mined_batch", async (req, res) => {
  const { tested_mined_batch_id } = req.query;
  const mined_batch_response = await TestedMinedBatch.findById(
    tested_mined_batch_id
  ).lean();
  res.status(200).json(mined_batch_response);
});

router.get("/api/tested_mined_batch/verify", async (req, res) => {
  const { _id } = req.cookies;
  const { tested_mined_batch_id, tested_mined_batch_hash } = req.query;
  const warehouse_response = await Warehouse.findById(_id);
  const tested_mined_batch_response = await TestedMinedBatch.findOne({
    _id: tested_mined_batch_id,
    mine_id: warehouse_response.mine_id,
  }).lean();
  if (tested_mined_batch_response === null) {
    return res.status(201).json({
      message: "Mined Batch not found",
      type: "error",
    });
  }
  const hashMatch = bcrypt.compare(
    JSON.stringify({
      mine_id: tested_mined_batch_response._id,
      manager_id: tested_mined_batch_response.manager_id,
      type_of_ore: tested_mined_batch_response.type_of_ore,
      fe_percentage: tested_mined_batch_response.fe_percentage,
      grade: tested_mined_batch_response.grade,
      quantity: tested_mined_batch_response.quantity,
      status: tested_mined_batch_response.status,
      sample_image_url: tested_mined_batch_response.sample_image_url,
      mine_lab_report_url: tested_mined_batch_response.mine_lab_report_url,
    }),
    tested_mined_batch_hash
  );
  if (!hashMatch) {
    return res.status(201).json({
      message: "Mined Batch hash does not match",
      type: "error",
    });
  }
  res.status(200).json(tested_mined_batch_response);
});

router.get("/api/transaction", async (req, res) => {
  const { transaction_id } = req.query;
  const transaction_response = await Transaction.findById(
    transaction_id
  ).lean();
  res.status(200).json(transaction_response);
});

router.get("/api/transaction/verify", async (req, res) => {
  const { type_of_user, _id } = req.cookies;
  const { transaction_id, transaction_hash } = req.query;
  let transaction_response;
  if (type_of_user === "organisation") {
    transaction_response = await Transaction.findOne({
      _id: transaction_id,
      buyer_org_id: _id,
      status: "dispatched",
    }).lean();
  } else if (type_of_user === "checkpoint") {
    transaction_response = await Transaction.findOne({
      _id: transaction_id,
      status: "dispatched",
    }).lean();
  } else {
    return res.status(400).json({
      message: "Invalid User",
      type: "error",
    });
  }
  if (transaction_response === null) {
    return res.status(201).json({
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
