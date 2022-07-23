const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Officer = require("../../models/OfficerSchema");
const User = require("../../models/UserSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

router.post(
  "/api/registration/officer",
  async (req, res, next) => {
    const {
      officer_name,
      email_address,
      phone_no,
      aadhar_card,
      type_of_region,
      region_name,
    } = req.body;
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
      const email_address_check = await User.findOne({
        email_address: email_address,
      });
      if (email_address_check !== null) {
        return res.status(201).json({
          message: "Email Address already exist",
          type: "warning",
        });
      }
      const region_id_generate = new ShortUniqueId({
        length: 15,
      });
      const officer_id_generate = new ShortUniqueId({
        length: 10,
      });
      const password_generate = new ShortUniqueId({
        length: 8,
      });
      const officer_id = officer_id_generate();
      const region_id = region_id_generate();
      const password = password_generate();
      const auth = jwt.sign(
        {
          auth_id: officer_id,
        },
        aadhar_card
      );
      const officer_check = await Officer.findOne({
        type_of_region: type_of_region,
        region_name: region_name,
      });
      if (officer_check !== null) {
        await User.findOneAndUpdate(
          {
            user_id: officer_check.officer_id,
          },
          {
            is_valid: false,
          }
        );
        await Officer.findOneAndUpdate(
          {
            region_id: officer_check.region_id,
          },
          {
            officer_id: officer_id,
          }
        );
      } else {
        await Officer.create({
          region_id: region_id,
          officer_id: officer_id,
          type_of_region: type_of_region,
          region_name: region_name,
        });
      }
      await User.create({
        auth: auth,
        user_id: officer_id,
        type_of_user: "officer",
        user_name: officer_name,
        aadhar_card: aadhar_card,
        email_address: email_address,
        phone_no: phone_no,
        password: bcrypt.hashSync(password, 10),
        c_password: bcrypt.hashSync(password, 10),
      });
      req.user_id = officer_id;
      req.user_name = officer_name;
      req.user_type = "Officer";
      req.email_address = email_address;
      req.password = password;
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
  RegistrationEmailSender
);
module.exports = router;
