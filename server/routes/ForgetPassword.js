const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const Transaction = require("../models/TransationSchema");

router.post("/api/forget_password", async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const response = await User.findOne({
      user_id: user_name,
      is_valid: true,
    });
    if (response === null) {
      return res.status(201).json({
        message: "Invalid Credential",
        type: "error",
      });
    }
    const passwordMatch = await bcrypt.compare(password, response.password);
    if (!passwordMatch) {
      return res.status(201).json({
        message: "Invalid Credential",
        type: "error",
      });
    }
    req.session.type_of_user = response.type_of_user;
    res
      .cookie("auth", response.auth, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .cookie("type_of_user", response.type_of_user, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        message: "Successfully Logged In",
        type: "success",
        path: `${response.type_of_user}_dashboard`,
      });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.post("/api/test", async (req, res) => {
  try {
    const transaction_response = await Transaction.aggregate([
      {

      }
    ]);
    res
      .json({
        message: "Successfully Logged In",
        type: "success",
      });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
