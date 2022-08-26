const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const MinedBatch = require("../../models/MinedBatchSchema");

router.post("/api/registration/mined_batch/miner", async (req, res) => {
  const { _id } = req.cookies;
  const { quantity } = req.body;
  try {
    const mine_response = await Mine.findById(_id)
      .distinct("manager_id")
      .lean();
    await MinedBatch.create({
      mine_id: _id,
      manager_id: mine_response[0],
      quantity: quantity,
    });
    await Mine.findByIdAndUpdate(_id, {
      $inc: {
        rom: parseInt(quantity),
      },
    });
    res.status(200).json({
      message: "Successfully Registered",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

module.exports = router;
