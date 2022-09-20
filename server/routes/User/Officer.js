const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const mongoose = require("mongoose");

router.get("/api/user/officer", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const response = await Region.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "officer_id",
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
