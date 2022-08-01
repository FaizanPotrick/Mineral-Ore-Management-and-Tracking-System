const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const Region = require("../models/RegionSchema");
const bcrypt = require("bcrypt");

router.post("/api/login", async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user_response = await User.findOne({
      user_id: user_name,
      is_valid: true,
    });
    if (user_response === null) {
      return res.status(201).json({
        message: "Invalid Credential",
        type: "error",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user_response.password);
    if (!passwordMatch) {
      return res.status(201).json({
        message: "Invalid Credential",
        type: "error",
      });
    }
    if (user_response.type_of_user === "officer") {
      const region_response = await Region.findOne({
        officer_id: user_response.user_id,
      });
      req.session.type_of_region = region_response.type_of_region;
      req.session.region_id = region_response._id;
      res
        .cookie("type_of_region", region_response.type_of_region)
        .cookie("region_id", region_response._id);
    }
    req.session.type_of_user = user_response.type_of_user;
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
        path: `${user_response.type_of_user}_dashboard`,
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
