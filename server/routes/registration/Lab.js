const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/UserSchema");
const Lab = require("../../models/LabSchema");
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");
const MinedBatchSchema = require("../../models/MinedBatchSchema");
const id_generate = new ShortUniqueId({
  length: 8,
});

router.post(
  "/api/registration/lab",
  async (req, res, next) => {
    const { _id } = req.cookies;
    const {
      lab_name,
      name,
      email_address,
      phone_no,
      aadhar_card,
      coordinates,
    } = req.body;
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
      const lab_manager_id = id_generate();
      const password = id_generate();
      await Promise.all([
        User.create({
          auth: jwt.sign(
            {
              auth_id: lab_manager_id,
            },
            aadhar_card
          ),
          user_id: lab_manager_id,
          type_of_user: "lab",
          user_name: name,
          aadhar_card: aadhar_card,
          email_address: email_address,
          phone_no: phone_no,
          password: bcrypt.hashSync(password, 10),
          c_password: bcrypt.hashSync(password, 10),
        }),
        Lab.create({
          lab_manager_id: lab_manager_id,
          region_id: _id,
          lab_name: lab_name,
          coordinates: coordinates,
        }),
      ]);
      req.user_id = lab_manager_id;
      req.user_name = name;
      req.user_type = "Lab";
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

router.post("/api/upload_batch_report", async (req, res, next) => {
  try {
    const { _id } = req.cookies;
    const { batch_id, fe_percent } = req.body;
    const { batch_lab_report } = req.files;
    const storage = getStorage(app);
    const documentRef = ref(
      storage,
      "/batch_lab_report/" + batch_lab_report.name
    );
    const batch_lab_report_path = await uploadBytes(
      documentRef,
      batch_lab_report.data
    );
    const batch_lab_report_url_signed = await getSignedUrl(
      batch_lab_report_path
    );
    console.log("signed urls: ", batch_lab_report_url_signed);
    const batch_lab_report_url = await getDownloadURL(
      ref(storage, mine_lap_report_path.metadata.fullPath)
    );
    await MinedBatchSchema.updateOne(batch_id, {
      batch_lab_report_url: batch_lab_report_url,
    });
    res.status(200).json({
      message: "Successfully Registered",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
