const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Miner = require("../../model/MinerSchema");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { generatePassword } = require("../../function/PasswordGenerator");
const { EmailSender } = require("../../middleware/EmailSender");
const {
  email_address_validation,
  name_validation,
  phone_no_validation,
  number_validation,
  string_validation,
  address_validation,
} = require("../../function/InputValidation");

router.post(
  "/miner_registeration",
  async (req, res, next) => {
    const {
      mine_name,
      location,
      owner_name,
      email_address,
      phone_no,
      block_no,
      gst_no,
      period,
    } = req.body;
    try {
      if (
        !name_validation(mine_name) ||
        !address_validation(location) ||
        !name_validation(owner_name) ||
        !email_address_validation(email_address) ||
        !phone_no_validation(phone_no) ||
        !string_validation(block_no) ||
        !string_validation(gst_no) ||
        !number_validation(period)
      ) {
        return res.status(201).json({
          message: "Please fill all the required fields correctly",
          type: "error",
        });
      }
      const miner = await Miner.find({ email_address });
      if (miner.length !== 0) {
        return res.status(201).json({
          message: "Email address already exists, try another one",
          type: "warning",
        });
      }
      const password = generatePassword();
      const auth = jwt.sign({ auth_id: email_address }, gst_no);
      const today = new Date();
      const response = await new Miner({
        auth: auth,
        mine_name: mine_name,
        location: location,
        owner_name: owner_name,
        email_address: email_address,
        phone_no: phone_no,
        block_no: block_no,
        gst_no: gst_no,
        lease_period: {
          from: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          ),
          period: period,
          to: new Date(
            today.getFullYear() + period,
            today.getMonth(),
            today.getDate()
          ),
        },
        password: bcrypt.hashSync(password, 10),
        c_password: bcrypt.hashSync(password, 10),
      });
      req.password = password;
      await response.save();
      res.status(200).json({
        message: "Successfully Registered",
        type: "success",
      });
      next();
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        message: "Invalid Request",
        type: "error",
      });
    }
  },
  EmailSender
);
router.put("/miner_login", async (req, res) => {
  const { email_address, password } = req.body;
  try {
    if (!email_address || !password) {
      return res.status(201).json({
        message: "Please fill all the required fields correctly",
        type: "error",
      });
    }
    const response = await Miner.find({
      email_address: email_address,
    });
    if (response.length === 0) {
      return res.status(201).json({
        message: "Invalid Creditentials",
        type: "error",
      });
    }
    const passwordMatch = await bcrypt.compare(password, response[0].password);
    if (!passwordMatch) {
      return res.status(201).json({
        message: "Invalid Creditentials",
        type: "error",
      });
    }

    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("auth", response[0].auth, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        })
      )
      .status(200)
      .json({ message: "Successfully Logged In", type: "success" });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
