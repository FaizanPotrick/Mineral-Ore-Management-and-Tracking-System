const express = require("express");
const router = express.Router();
const Warehouse = require("../../models/WarehouseSchema");
const mongoose = require("mongoose");

router.get("/api/user/warehouse", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.warehouse_id) {
    _id = req.query.warehouse_id;
  }
  const response = await Warehouse.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "warehouse_manager_id",
        foreignField: "user_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 0,
        name: "$user.user_name",
        email_address: "$user.email_address",
      },
    },
  ]);
  res.json(response[0]);
});

module.exports = router;
