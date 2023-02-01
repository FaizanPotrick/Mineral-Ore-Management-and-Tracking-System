const express = require("express");
const { Types } = require("mongoose");

const User = require("../models/User");
const Region = require("../models/Region");
const Organization = require("../models/Organization");
const Mine = require("../models/Mine");
const Warehouse = require("../models/Warehouse");
const CheckPoint = require("../models/CheckPoint");
const Lab = require("../models/Lab");

const router = express.Router();

router.put("/api/login", async (req, res) => {
  const { user_name, password } = req.body;
  const user_response = await User.findOne({
    user_id: user_name,
    password: password,
    is_valid: true,
  })
    .select(["auth", "user_id", "type_of_user", "password"])
    .lean();
  if (user_response === null) {
    return res.status(400).json({
      message: "Invalid Credential",
      type: "error",
    });
  }
  let id;
  req.session.type_of_user = user_response.type_of_user;
  if (user_response.type_of_user === "government") {
    const { type_of_region, _id } = await Region.findOne({
      officer_id: user_response.user_id,
    })
      .select("type_of_region")
      .lean();
    req.session.type_of_region = type_of_region;
    id = _id;
    res.cookie("type_of_region", type_of_region);
  } else if (user_response.type_of_user === "organization") {
    const { _id } = await Organization.findOne({
      ceo_id: user_response.user_id,
    })
      .select("_id")
      .lean();
    id = _id;
  } else if (user_response.type_of_user === "mine") {
    const { _id } = await Mine.findOne({
      manager_id: user_response.user_id,
    })
      .select("_id")
      .lean();
    id = _id;
  } else if (user_response.type_of_user === "warehouse") {
    const { _id } = await Warehouse.findOne({
      manager_id: user_response.user_id,
    })
      .select("_id")
      .lean();
    id = _id;
  } else if (user_response.type_of_user === "checkpoint") {
    const { _id } = await CheckPoint.findOne({
      officer_id: user_response.user_id,
    })
      .select("_id")
      .lean();
    id = _id;
  } else if (user_response.type_of_user === "lab") {
    const { _id } = await Lab.findOne({
      manager_id: user_response.user_id,
    })
      .select("_id")
      .lean();
    id = _id;
  }
  req.session._id = id;
  res
    .cookie("_id", id, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .cookie("type_of_user", user_response.type_of_user, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .end();
});

router.get("/api/user/government", async (req, res) => {
  const response = await Region.aggregate([
    {
      $match: {
        _id: Types.ObjectId(req.cookies._id),
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

router.get("/api/user/organization", async (req, res) => {
  const response = await Organization.aggregate([
    {
      $match: {
        _id: Types.ObjectId(req.cookies._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "ceo_id",
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

router.get("/api/user/mine", async (req, res) => {
  const response = await Mine.aggregate([
    {
      $match: {
        _id: Types.ObjectId(req.cookies._id),
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

router.get("/api/user/warehouse", async (req, res) => {
  const response = await Warehouse.aggregate([
    {
      $match: {
        _id: Types.ObjectId(req.cookies._id),
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

router.get("/api/user/checkpoint", async (req, res) => {
  const response = await CheckPoint.aggregate([
    {
      $match: {
        _id: Types.ObjectId(req.cookies._id),
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

router.get("/api/user/lab", async (req, res) => {
  const response = await Lab.aggregate([
    {
      $match: {
        _id: Types.ObjectId(req.cookies._id),
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
