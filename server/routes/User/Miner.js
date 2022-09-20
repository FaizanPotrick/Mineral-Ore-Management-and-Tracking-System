const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const mongoose = require("mongoose");

router.get("/api/user/miner", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.mine_id) {
    _id = req.query.mine_id;
  }
  const response = await Mine.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "manager_id",
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
