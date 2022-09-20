const express = require("express");
const router = express.Router();
const CheckPoint = require("../../models/CheckPointSchema");
const mongoose = require("mongoose");

router.get("/api/user/checkpoint", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.checkpoint_id) {
    _id = req.query.checkpoint_id;
  }
  const response = await CheckPoint.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "checkpoint_officer_id",
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
