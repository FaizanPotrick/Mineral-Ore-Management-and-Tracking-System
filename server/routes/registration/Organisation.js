const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Organisation = require("../../models/OrganisationSchema");
const User = require("../../models/UserSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");
const id_genarate = new ShortUniqueId({
  length: 8,
});
router.post(
  "/api/registration/organisation",
  async (req, res, next) => {
    const {
      organisation_name,
      address,
      name,
      email_address,
      phone_no,
      aadhar_card,
      gst_no,
    } = req.body;
    try {
      const organisation_check = await Organisation.findOne({
        gst_no: gst_no,
      });
      if (organisation_check !== null) {
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
      const ceo_id = id_genarate();
      const auth = jwt.sign(
        {
          auth_id: ceo_id,
        },
        aadhar_card
      );
      const password = id_genarate();
      await User.create({
        auth: auth,
        user_id: ceo_id,
        type_of_user: "organisation",
        user_name: name,
        aadhar_card: aadhar_card,
        email_address: email_address,
        phone_no: phone_no,
        password: bcrypt.hashSync(password, 10),
        c_password: bcrypt.hashSync(password, 10),
      });
      await Organisation.create({
        ceo_id: ceo_id,
        organisation_name: organisation_name,
        gst_no: gst_no,
        address: address,
      });
      req.user_id = ceo_id;
      req.user_name = name;
      req.user_type = "Organisation";
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
