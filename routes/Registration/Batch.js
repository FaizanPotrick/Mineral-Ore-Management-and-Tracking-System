const express = require("express");
const bcrypt = require("bcrypt");

const Mine = require("../../models/Mine");
const Warehouse = require("../../models/Warehouse");
const MinedBatch = require("../../models/MinedBatch");
const TestedMinedBatch = require("../../models/TestedMinedBatch");
const { Grade } = require("../../Constant");

const router = express.Router();

router.post("/api/registration/mine/mined_batch", async (req, res) => {
  const { _id } = req.cookies;
  const { quantity } = req.body;
  try {
    const { manager_id } = await Mine.findById(_id).lean();
    await MinedBatch.create({
      mine_id: _id,
      manager_id: manager_id,
      quantity: parseInt(quantity),
    });
    await Mine.findByIdAndUpdate(_id, {
      $inc: {
        rom: parseInt(quantity),
      },
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.post("/api/registration/mine/tested_mined_batch", async (req, res) => {
  const { _id } = req.cookies;
  const { type_of_ore, fe_percentage, quantity, waste } = req.body;
  const grade =
    parseInt(fe_percentage) >= Grade.high
      ? "high"
      : parseInt(fe_percentage) < Grade.medium &&
        parseInt(fe_percentage) >= Grade.low
      ? "medium"
      : "low";
  const mine_response = await Mine.findById(_id)
    .select(["manager_id", "region_id", "rom"])
    .lean();
  if (mine_response.rom < parseInt(quantity) + parseInt(waste)) {
    return res.status(400).json({
      message: "Less ROM",
      type: "warning",
    });
  }
  try {
    await TestedMinedBatch.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      type_of_ore: type_of_ore,
      fe_percentage: parseInt(fe_percentage),
      grade: grade,
      quantity: parseInt(quantity),
      waste: parseInt(waste),
      batch_hash: bcrypt.hashSync(
        JSON.stringify({
          mine_id: _id,
          manager_id: mine_response.manager_id,
          type_of_ore: type_of_ore,
          fe_percentage: parseInt(fe_percentage),
          grade: grade,
          quantity: parseInt(quantity),
          waste: parseInt(waste),
        }),
        10
      ),
    });
    await Mine.findByIdAndUpdate(_id, {
      $inc: {
        rom: -(parseInt(quantity) + parseInt(waste)),
      },
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.get(
  "/api/registration/warehouse/tested_mined_batch",
  async (req, res) => {
    const { _id } = req.cookies;
    const { batch_id } = req.query;
    try {
      const tested_mine_batch = await TestedMinedBatch.findByIdAndUpdate(
        batch_id,
        {
          status: "delivered",
        }
      ).lean();
      await Warehouse.findByIdAndUpdate(_id, {
        $inc: {
          [`ores_available.${tested_mine_batch.grade}.${tested_mine_batch.type_of_ore}`]:
            tested_mine_batch.quantity,
        },
      });
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Invalid Request",
        type: "error",
      });
    }
  }
);

module.exports = router;
