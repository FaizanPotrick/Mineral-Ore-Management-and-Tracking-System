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
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const app = initializeApp({
  storageBucket: process.env.BUCKET_URL,
});
const storage = getStorage(app);
const id_generate = new ShortUniqueId({
  length: 8,
});

router.post(
  "/api/registration/mine",
  async (req, res, next) => {
    const { _id } = req.cookies;
    const {
     
      name,
      email_address,
      phone_no,
      aadhar_card,
      pin_code,
      area,
    expected_ores_available_high,
    expected_ores_available_low,
    expected_ores_available_medium, 
      period,
      latitude,
      longitude,
    } = req.body;
    const { plan_doc } = req.files;
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
      const planDocRef = ref(storage, "/plan_doc/" + plan_doc.name);
      const plan_doc_path = await uploadBytes(planDocRef, plan_doc.data);
      const plan_doc_url = await getDownloadURL(
        ref(storage, plan_doc_path.metadata.fullPath)
      );
      const manager_id = id_generate();
      const password = id_generate();
      const today = new Date();
      const [user,mine] = await Promise.all([
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
          
          manager_id: manager_id,
          region_id: _id,
          location: {
            pin_code: pin_code,
            coordinates: {
              latitude: latitude,
              longitude: longitude,
            },
          },
          
          area: area,
          expected_ores_available: {
            high: expected_ores_available_high,
            medium: expected_ores_available_medium,
            low: expected_ores_available_low,
          },
          plan_doc_url: plan_doc_url,
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
      console.log({
        Username: manager_id,
        Password: password,
      });
      
      res.status(200).json({
        mine_id: mine._id,
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
