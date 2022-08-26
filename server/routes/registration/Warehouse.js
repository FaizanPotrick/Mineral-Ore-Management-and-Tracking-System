const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/UserSchema");
const jwt = require("jsonwebtoken");
const Warehouse = require("../../models/WarehouseSchema");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

const id_generate = new ShortUniqueId({
  length: 8,
});

router.post(
  "/api/registration/warehouse",
  async (req, res, next) => {
    const {
      name,
      email_address,
      phone_no,
      aadhar_card,
      area,
      latitude,
      longitude,
    } = req.body;
    const { mine_id } = req.query;
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
      const warehouse_manager_id = id_generate();
      const password = id_generate();
      await Promise.all([
        User.create({
          auth: jwt.sign(
            {
              auth_id: warehouse_manager_id,
            },
            aadhar_card
          ),
          user_id: warehouse_manager_id,
          type_of_user: "warehouse",
          user_name: name,
          aadhar_card: aadhar_card,
          email_address: email_address,
          phone_no: phone_no,
          password: bcrypt.hashSync(password, 10),
          c_password: bcrypt.hashSync(password, 10),
        }),
        Warehouse.create({
          mine_id: mine_id,
          warehouse_manager_id: warehouse_manager_id,
          coordinates: {
            latitude: latitude,
            longitude: longitude,
          },
          area: area,
        }),
      ]);
      req.user_id = warehouse_manager_id;
      req.user_name = name;
      req.user_type = "Warehouse";
      req.email_address = email_address;
      req.password = password;
      console.log({
        Username: warehouse_manager_id,
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