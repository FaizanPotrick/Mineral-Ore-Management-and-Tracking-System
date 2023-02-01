const express = require("express");
const bcrypt = require("bcrypt");

const TestedMinedBatch = require("../models/TestedMinedBatch");
const Warehouse = require("../models/Warehouse");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/api/verify/tested_mined_batch", async (req, res) => {
  const { _id } = req.cookies;
  const { batch_id, batch_hash } = req.query;
  const warehouse_response = await Warehouse.findById(_id);
  const tested_mined_batch_response = await TestedMinedBatch.findOne({
    _id: batch_id,
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
      waste: tested_mined_batch_response.waste,
    }),
    batch_hash
  );
  if (!hashMatch) {
    return res.status(201).json({
      message: "Mined Batch hash does not match",
      type: "error",
    });
  }
  res.status(200).json(tested_mined_batch_response);
});

router.get("/api/verify/transaction", async (req, res) => {
  const { type_of_user, _id } = req.cookies;
  const { transaction_id, transaction_hash } = req.query;
  let transaction_response;
  if (type_of_user === "organization") {
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
    return res.status(201).json({
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
      grade: transaction_response.grade,
      quantity: transaction_response.quantity,
      price: transaction_response.price,
      royalty: transaction_response.royalty,
      vehicle_no: transaction_response.vehicle_no,
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
