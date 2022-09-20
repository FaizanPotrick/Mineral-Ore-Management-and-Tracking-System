const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Organisation = require("../../models/OrganisationSchema");

router.get("/api/dashboard/organisation", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.organisation_id) {
    _id = req.query.organisation_id;
  }
  const response = await Organisation.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $project: {
        _id: 0,
        title: "$organisation_name",
        cards: [
          {
            title: "Total High Ores Bought(in mt)",
            value: "$ores_bought.high",
          },
          {
            title: "Total Medium Ores Bought(in mt)",
            value: "$ores_bought.medium",
          },
          {
            title: "Total Low Ores Bought(in mt)",
            value: "$ores_bought.low",
          },
        ],
      },
    },
  ]);
  res.json(response[0]);
});

module.exports = router;
