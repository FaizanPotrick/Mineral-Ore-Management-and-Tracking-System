const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Officer = require("../../models/OfficerSchema");
const User = require("../../models/UserSchema")
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

router.post(
  "/api/officer/registration",
  async (req, res, next) => {
      const {
        officer_name,
        aadhar_card,
        email_address,
        phone_no,
        type_of_region,
        region_name,
      } = req.body;
      try {
        if (
          !officer_name ||
          !aadhar_card ||
          !email_address ||
          !phone_no ||
          !type_of_region ||
          !region_name
        ) {
          return res.status(201).json({
            message: "Please fill all the required fields correctly",
            type: "error",
          });
        }
        const region_id_generate = new ShortUniqueId({
          length: 10
        });
        const officer_id_generate = new ShortUniqueId({
          length: 10
        });
        const password_generate = new ShortUniqueId({
          length: 8
        });
        const officer_id = officer_id_generate();
        const region_id = region_id_generate();
        const password = password_generate();
        const auth = jwt.sign({
          auth_id: region_id
        }, aadhar_card);
        const officer_check = await Officer.find({
          type_of_region: type_of_region,
          region_name: region_name,
        });
        if (officer_check.length !== 0) {
          await User.findOneAndUpdate({
            user_id: officer_check[0].officer_id
          }, {
            is_valid: false
          });
          await Officer.findOneAndUpdate({
            officer_id: officer_check[0].officer_id,
          }, {
            officer_id: officer_id
          });
        } else {
          const officer_response = await new Officer({
            region_id: region_id,
            officer_id: officer_id,
            type_of_region: type_of_region,
            region_name: region_name,
          });
          await officer_response.save();
        }
        const user_response = await new User({
          auth: auth,
          user_id: officer_id,
          type_of_user: "officer",
          user_name: officer_name,
          aadhar_card: aadhar_card,
          email_address: email_address,
          phone_no: phone_no,
          password: bcrypt.hashSync(password, 10),
          c_password: bcrypt.hashSync(password, 10),
        })
        await user_response.save();
        req.credentials = {
          user_id: officer_id,
          user_name: officer_name,
          email_address: email_address,
          password: password
        }
        res.status(200).json({
          message: "Officer is Successfully Registered",
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