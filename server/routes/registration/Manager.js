const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/UserSchema");
const Mine = require("../../models/MineSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");
const id_generate = new ShortUniqueId({
  length: 8,
});
router.post(
  "/api/registration/manager",
  async (req, res, next) => {
    const { name, email_address, phone_no, aadhar_card } = req.body;
    const { mine_id } = req.query;
    try {
      const aadhar_card_check = await User.findOne({
        aadhar_card: aadhar_card,
      });
      if (aadhar_card_check !== null) {
        return res.status(201).json({
          message: "Aadhar Card already exist",
          type: "warning",
        });
      }
      const user_id = id_generate();
      const generate_auth = jwt.sign(
        {
          auth_id: user_id,
        },
        aadhar_card
      );
      const password = id_generate();
      await User.create({
        auth: generate_auth,
        user_id: user_id,
        type_of_user: "miner",
        user_name: name,
        aadhar_card: aadhar_card,
        email_address: email_address,
        phone_no: phone_no,
        password: bcrypt.hashSync(password, 10),
        c_password: bcrypt.hashSync(password, 10),
      });
      const mine_response = await Mine.findById(mine_id).distinct("manager_id");
      await User.findOneAndUpdate(
        { user_id: mine_response[0] },
        {
          is_valid: false,
        }
      );
      await Mine.findByIdAndUpdate(mine_id, {
        manager_id: user_id,
      });
      req.user_id = user_id;
      req.user_name = name;
      req.user_type = "Manager";
      req.email_address = email_address;
      req.password = password;
      res.status(200).json({
        message: "Successfully Registered",
        type: "success",
      });
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Invalid Request",
        type: "error",
      });
    }
  },
  RegistrationEmailSender
);
module.exports = router;
