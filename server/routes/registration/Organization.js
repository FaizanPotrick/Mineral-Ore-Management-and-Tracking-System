const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Organization = require("../../models/OrganizationSchema");
const User = require("../../models/UserSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

router.post(
  "/api/registration/organization",
  async (req, res, next) => {
    const {
      organization_name,
      address,
      ceo_name,
      email_address,
      phone_no,
      aadhar_card,
      gst_no,
    } = req.body;
    try {
      const organization_check = await Organization.findOne({
        gst_no: gst_no,
      });
      if (organization_check !== null) {
        return res.status(201).json({
          message: "GST Number already exist",
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
      const ceo_id_genarate = new ShortUniqueId({
        length: 10,
      });
      const ceo_id = ceo_id_genarate();
      const auth = jwt.sign(
        {
          auth_id: ceo_id,
        },
        aadhar_card
      );
      const password_generate = new ShortUniqueId({
        length: 8,
      });
      const password = password_generate();
      await User.create({
        auth: auth,
        user_id: ceo_id,
        type_of_user: "organization",
        user_name: ceo_name,
        aadhar_card: aadhar_card,
        email_address: email_address,
        phone_no: phone_no,
        password: bcrypt.hashSync(password, 10),
        c_password: bcrypt.hashSync(password, 10),
      });
      const organization_id_genarate = new ShortUniqueId({
        length: 15,
      });
      const organization_id = organization_id_genarate();
      await Organization.create({
        organization_id: organization_id,
        ceo_id: ceo_id,
        organization_name: organization_name,
        gst_no: gst_no,
        address: address,
      });
      req.user_id = ceo_id;
      req.user_name = ceo_name;
      req.user_type = "Organization";
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
