const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const User = require("../models/UserSchema");
const CheckPoint = require("../models/CheckPointSchema");

router.get("/api/user/officer", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.region_id) {
    _id = req.query.region_id;
  }
  const region_user = await Region.findById(_id).distinct("officer_id");
  const user_response = await User.findOne({
    user_id: region_user[0],
  })
    .select(["user_name", "email_address"])
    .lean();
  res.json({
    name: user_response.user_name,
    email_address: user_response.email_address,
  });
});
router.get("/api/user/organisation", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.organisation_id) {
    _id = req.query.organisation_id;
  }
  const organisation_response = await Organisation.findById(_id).distinct(
    "ceo_id"
  );
  const user_response = await User.findOne({
    user_id: organisation_response[0],
  })
    .select(["user_name", "email_address"])
    .lean();
  res.json({
    name: user_response.user_name,
    email_address: user_response.email_address,
  });
});
router.get("/api/user/miner", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.mine_id) {
    _id = req.query.mine_id;
  }
  const mine_response = await Mine.findById(_id).distinct("manager_id");
  const user_response = await User.findOne({
    user_id: mine_response[0],
  })
    .select(["user_name", "email_address"])
    .lean();
  res.json({
    name: user_response.user_name,
    email_address: user_response.email_address,
  });
});

router.get("/api/user/checkpoint", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.mine_id) {
    _id = req.query.mine_id;
  }
  const checkpoint_response = await CheckPoint.findById(_id).distinct(
    "checkpoint_officer_id"
  );
  const user_response = await User.findOne({
    user_id: checkpoint_response[0],
  })
    .select(["user_name", "email_address"])
    .lean();
  res.json({
    name: user_response.user_name,
    email_address: user_response.email_address,
  });
});

module.exports = router;
