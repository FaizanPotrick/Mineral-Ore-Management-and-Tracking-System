const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Region = require("../../models/RegionSchema");
const User = require("../../models/UserSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");
const id_generate = new ShortUniqueId({
  length: 8,
});
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
      const officer_id = id_generate();
      const auth = jwt.sign(
        {
          auth_id: officer_id,
        },
        aadhar_card
      );
      const password = id_generate();
      const region_check = await Region.findOne({
        type_of_region: type_of_region,
        [type_of_region]: region_name,
      });
      if (region_check === null) {
        return res.status(201).json({
          message: "Region not found",
          type: "warning",
        });
      }
      if (region_check.officer_id !== undefined) {
        await User.findOneAndUpdate(
          {
            user_id: region_check.officer_id,
          },
          {
            is_valid: false,
          }
        );
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
      await Region.findOneAndUpdate(
        {
          _id: region_check._id,
        },
        {
          officer_id: officer_id,
        }
      );
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
