const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/UserSchema");
const Organisation = require("../../models/OrganisationSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");
const id_generate = new ShortUniqueId({
  length: 8,
});
router.post(
  "/api/registration/ceo",
  async (req, res, next) => {
    const { name, email_address, phone_no, aadhar_card } = req.body;
    const { auth, _id } = req.cookies;
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
      const user_id = id_generate();
      const password = id_generate();
      await Promise.all([
        await User.create({
          auth: jwt.sign(
            {
              auth_id: user_id,
            },
            aadhar_card
          ),
          user_id: user_id,
          type_of_user: "organisation",
          user_name: name,
          aadhar_card: aadhar_card,
          email_address: email_address,
          phone_no: phone_no,
          password: bcrypt.hashSync(password, 10),
          c_password: bcrypt.hashSync(password, 10),
        }),
        await User.findOneAndUpdate(
          { auth: auth },
          {
            is_valid: false,
          }
        ),
        await Organisation.findByIdAndUpdate(_id, {
          ceo_id: user_id,
        }),
      ]);
      req.user_id = user_id;
      req.user_name = name;
      req.user_type = "CEO";
      req.email_address = email_address;
      req.password = password;
      req.session.destroy();
      res
        .clearCookie("auth")
        .clearCookie("connect.sid")
        .clearCookie("type_of_user")
        .clearCookie("type_of_region")
        .clearCookie("_id")
        .status(200)
        .json({
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
