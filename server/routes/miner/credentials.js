const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Miner = require("../../model/MinerSchema");
const jwt = require("jsonwebtoken");
const { generatePassword } = require("../../function/PasswordGenerator");
const { EmailSender } = require("../../middleware/EmailSender");

router.post(
  "/miner/credentials",
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
        !mine_name ||
        !location ||
        !owner_name ||
        !email_address ||
        !phone_no ||
        !block_no ||
        !gst_no ||
        !period
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
      res.status(400).json({
        message: "Invalid Request",
        type: "error",
      });
    }
  },
  EmailSender
);
router.put("/miner/credentials", async (req, res) => {
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
    res.status(200).json({
      message: "Successfully Logged In",
      type: "success",
      auth: response[0].auth,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
