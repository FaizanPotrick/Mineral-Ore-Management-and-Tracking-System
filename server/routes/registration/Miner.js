const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Miner = require("../../models/MinerSchema");
const User = require("../../models/UserSchema")
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

router.post(
  "/api/miner/registration",
  async (req, res, next) => {
      const {
        organization_id,
        manager_name,
        aadhar_card,
        email_address,
        phone_no,
        district,
        state,
        pincode,
        latitude,
        longitude,
        mine_warehouse_capacity,
        mine_area,
        period,
      } = req.body;
      try {
        if (
          !organization_id ||
          !manager_name ||
          !aadhar_card ||
          !email_address ||
          !phone_no ||
          !district ||
          !state ||
          !pincode ||
          !latitude ||
          !longitude ||
          !mine_warehouse_capacity ||
          !mine_area ||
          !period
        ) {
          return res.status(201).json({
            message: "Please fill all the required fields correctly",
            type: "error",
          });
        }
        const organization_check = await Miner.find({
          organization_id: organization_id
        });
        if (organization_check.length === 0) {
          return res.status(201).json({
            message: "No Organization found, try another one",
            type: "warning",
          });
        }
        const mine_id_genarate = new ShortUniqueId({
          length: 10
        });
        const manager_id_genarate = new ShortUniqueId({
          length: 10
        });
        const password_generate = new ShortUniqueId({
          length: 8
        });
        const mine_id = mine_id_genarate();
        const manager_id = manager_id_genarate();
        const password = password_generate();
        const auth = jwt.sign({
          auth_id: manager_id
        }, aadhar_card);
        const today = new Date();
        const miner_response = await new Miner({
          mine_id: mine_id,
          organization_id: organization_id,
          manager_id: manager_id,
          location: {
            district: district,
            state: state,
            pincode: pincode,
            coordinate: {
              latitude: latitude,
              longitude: longitude,
            },
          },
          mine_warehouse_capacity: mine_warehouse_capacity,
          mine_area: mine_area,
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
        const user_response = await new User({
          auth: auth,
          user_id: manager_id,
          type_of_user: "miner",
          user_name: manager_name,
          aadhar_card: aadhar_card,
          email_address: email_address,
          phone_no: phone_no,
          password: bcrypt.hashSync(password, 10),
          c_password: bcrypt.hashSync(password, 10),
        })
        await miner_response.save();
        await user_response.save();
        req.credentials = {
          user_id: manager_id,
          user_name: manager_name,
          email_address: email_address,
          password: password
        }
        res.status(200).json({
          message: "Mine is Successfully Registered",
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