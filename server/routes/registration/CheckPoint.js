const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/UserSchema");
const CheckPoint = require("../../models/CheckPointSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

const id_genarate = new ShortUniqueId({
  length: 8,
});

router.post(
  "/api/registration/checkpoint",
  async (req, res, next) => {
    const { _id } = req.cookies;
    const { name, email_address, phone_no, aadhar_card, coordinates } =
      req.body;
    try {
      const aadhar_card_check = await User.findOne({
        aadhar_card: aadhar_card,
      }).lean();
      if (aadhar_card_check !== null) {
        return res.status(201).json({
          message: "Aadhar Card already exist",
          type: "warning",
        });
      }
      const checkpoint_officer_id = id_genarate();
      const password = id_genarate();
      await Promise.all([
        User.create({
          auth: jwt.sign(
            {
              auth_id: checkpoint_officer_id,
            },
            aadhar_card
          ),
          user_id: checkpoint_officer_id,
          type_of_user: "checkpoint",
          user_name: name,
          aadhar_card: aadhar_card,
          email_address: email_address,
          phone_no: phone_no,
          password: bcrypt.hashSync(password, 10),
          c_password: bcrypt.hashSync(password, 10),
        }),
        CheckPoint.create({
          checkpoint_officer_id: checkpoint_officer_id,
          region_id: _id,
          coordinates: coordinates,
        }),
      ]);
      req.user_id = checkpoint_officer_id;
      req.user_name = name;
      req.user_type = "Checkpoint Officer";
      req.email_address = email_address;
      req.password = password;
      console.log({
        Username: checkpoint_officer_id,
        Password: password,
      });
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
