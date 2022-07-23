const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Miner = require("../../models/MinerSchema");
const User = require("../../models/UserSchema");
const Organization = require("../../models/OrganizationSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

router.post(
  "/api/registration/miner",
  async (req, res, next) => {
    const {
      organization_id,
      manager_name,
      email_address,
      phone_no,
      aadhar_card,
      state,
      district,
      pin_code,
      area,
      warehouse_capacity,
      period,
      coordinate: { latitude, longitude },
    } = req.body;
    try {
      const organization_check = await Organization.findOne({
        organization_id: organization_id,
      });
      if (organization_check === null) {
        return res.status(201).json({
          message: "No Organization Found",
          type: "warning",
        });
      }
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
      const mine_id_genarate = new ShortUniqueId({
        length: 15,
      });
      const manager_id_genarate = new ShortUniqueId({
        length: 10,
      });
      const password_generate = new ShortUniqueId({
        length: 8,
      });
      const mine_id = mine_id_genarate();
      const manager_id = manager_id_genarate();
      const password = password_generate();
      const auth = jwt.sign(
        {
          auth_id: manager_id,
        },
        aadhar_card
      );
      const today = new Date();
      await Miner.create({
        mine_id: mine_id,
        organization_id: organization_id,
        manager_id: manager_id,
        location: {
          district: district,
          state: state,
          pin_code: pin_code,
          coordinate: {
            latitude: latitude,
            longitude: longitude,
          },
        },
        warehouse_capacity: warehouse_capacity,
        area: area,
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
      });
      await User.create({
        auth: auth,
        user_id: manager_id,
        type_of_user: "miner",
        user_name: manager_name,
        aadhar_card: aadhar_card,
        email_address: email_address,
        phone_no: phone_no,
        password: bcrypt.hashSync(password, 10),
        c_password: bcrypt.hashSync(password, 10),
      });
      req.user_id = manager_id;
      req.user_name = manager_name;
      req.user_type = "Miner";
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
