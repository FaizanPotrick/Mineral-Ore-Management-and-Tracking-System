const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const Region = require("../models/RegionSchema");
const Organisation = require("../models/OrganisationSchema");
const Mine = require("../models/MineSchema");
const bcrypt = require("bcrypt");

router.post("/api/login", async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user_response = await User.findOne({
      user_id: user_name,
      is_valid: true,
    })
      .select(["auth", "user_id", "type_of_user", "password"])
      .lean();
    if (user_response === null) {
      return res.status(201).json({
        message: "Invalid Credential",
        type: "error",
      });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user_response.password
    );
    if (!passwordMatch) {
      return res.status(201).json({
        message: "Invalid Credential",
        type: "error",
      });
    }
    req.session.type_of_user = user_response.type_of_user;
    if (user_response.type_of_user === "officer") {
      const region_response = await Region.findOne({
        officer_id: user_response.user_id,
      })
        .select("type_of_region")
        .lean();
      req.session.type_of_region = region_response.type_of_region;
      req.session._id = region_response._id;
      res
        .cookie("type_of_region", region_response.type_of_region)
        .cookie("_id", region_response._id);
    }
    if (user_response.type_of_user === "organisation") {
      const organisation_response = await Organisation.findOne({
        ceo_id: user_response.user_id,
      })
        .select("_id")
        .lean();
      req.session._id = organisation_response._id;
      res.cookie("_id", organisation_response._id);
    }
    if (user_response.type_of_user === "miner") {
      const mine_response = await Mine.findOne({
        manager_id: user_response.user_id,
      })
        .select("_id")
        .lean();
      req.session._id = mine_response._id;
      res.cookie("_id", mine_response._id);
    }
    res
      .cookie("auth", user_response.auth, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .cookie("type_of_user", user_response.type_of_user, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        message: "Successfully Logged In",
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

router.get("/api/logout", async (req, res) => {
  req.session.destroy();
  res
    .clearCookie("auth")
    .clearCookie("connect.sid")
    .clearCookie("type_of_user")
    .clearCookie("type_of_region")
    .clearCookie("_id")
    .status(200)
    .json({
      message: "Successfully Logged Out",
      type: "success",
    });
});

router.get("/api/authentication", async (req, res) => {
  if (req.session.type_of_user === req.cookies.type_of_user) {
    if (req.session._id === req.cookies._id) {
      return res.send(true);
    }
    if (req.session.type_of_user === "officer") {
      if (req.session.type_of_region === req.cookies.type_of_region) {
        return res.send(true);
      }
    }
  }
  res.send(false);
});
module.exports = router;
