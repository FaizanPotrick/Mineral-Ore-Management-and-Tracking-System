const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Mine = require("../../models/MineSchema");
const User = require("../../models/UserSchema");
const Organisation = require("../../models/OrganisationSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");
const moment = require("moment");
const id_genarate = new ShortUniqueId({
  length: 8,
});

router.post(
  "/api/registration/mine",
  async (req, res, next) => {
    const { _id } = req.cookies;
    const {
      organisation_id,
      name,
      email_address,
      phone_no,
      aadhar_card,
      pin_code,
      area,
      warehouse_capacity,
      period,
      coordinates,
    } = req.body;
    try {
      const organisation_check = await Organisation.findById(
        organisation_id
      ).lean();
      if (organisation_check === null) {
        return res.status(201).json({
          message: "No Organisation Found",
          type: "warning",
        });
      }
      const aadhar_card_check = await User.findOne({
        aadhar_card: aadhar_card,
      }).lean();
      if (aadhar_card_check !== null) {
        return res.status(201).json({
          message: "Aadhar Card already exist",
          type: "warning",
        });
      }
      const manager_id = id_genarate();
      const password = id_genarate();
      const today = new Date();
      await Promise.all([
        User.create({
          auth: jwt.sign(
            {
              auth_id: manager_id,
            },
            aadhar_card
          ),
          user_id: manager_id,
          type_of_user: "miner",
          user_name: name,
          aadhar_card: aadhar_card,
          email_address: email_address,
          phone_no: phone_no,
          password: bcrypt.hashSync(password, 10),
          c_password: bcrypt.hashSync(password, 10),
        }),
        Mine.create({
          organisation_id: organisation_id,
          manager_id: manager_id,
          region_id: _id,
          location: {
            pin_code: pin_code,
            coordinates: coordinates,
          },
          warehouse_capacity: warehouse_capacity,
          area: area,
          lease_period: {
            from: moment(today).format("DD MMM YYYY"),
            period: period,
            to: moment(today).add(period, "months").format("DD MMM YYYY"),
          },
        }),
      ]);
      req.user_id = manager_id;
      req.user_name = name;
      req.user_type = "Mine";
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
