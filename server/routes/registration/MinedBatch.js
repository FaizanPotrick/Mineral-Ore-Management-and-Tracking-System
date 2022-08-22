const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Mine = require("../../models/MineSchema");
const MinedBatch = require("../../models/MinedBatchSchema");
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

router.post("/api/registration/mined_batch/miner", async (req, res) => {
  const { _id } = req.cookies;
  const { lab_id, type_of_ore, quantity } = req.body;
  const { sample_image } = req.files;
  try {
    const mine_response = await Mine.findById(_id)
      .select(["manager_id", "region_id"])
      .lean();
    const region_response = await Region.findById(
      mine_response.region_id
    ).distinct("officer_id");

    const imageRef = ref(storage, "/sample_image/" + sample_image.name);
    const sample_image_path = await uploadBytes(imageRef, sample_image.data);
    const sample_image_url = await getDownloadURL(
      ref(storage, sample_image_path.metadata.fullPath)
    );
    await MinedBatch.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      officer_id: region_response[0],
      lab_id: lab_id,
      type_of_ore: type_of_ore,
      quantity: parseInt(quantity),
      sample_image_url: sample_image_url,
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

router.post("/api/registration/mined_batch/lab", async (req, res) => {
  const { batch_id } = req.query;
  const { fe_percentage, grade } = req.body;
  const { mine_lab_report } = req.files;
  try {
    const LabRef = ref(storage, "/mine_lab_report/" + mine_lab_report.name);
    const mine_lab_report_path = await uploadBytes(
      LabRef,
      mine_lab_report.data
    );
    const mine_lab_report_url = await getDownloadURL(
      ref(storage, mine_lab_report_path.metadata.fullPath)
    );
    await MinedBatch.findByIdAndUpdate(batch_id, {
      fe_percentage: parseInt(fe_percentage),
      grade: grade,
      mine_lab_report_url: mine_lab_report_url,
      status: "pending",
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

router.post("/api/registration/mined_batch/officer", async (req, res) => {
  const { batch_id } = req.query;
  const { status } = req.body;
  try {
    if (req.files.gov_lab_report) {
      const GovRef = ref(
        storage,
        "/gov_lab_report/" + req.files.gov_lab_report.name
      );
      const gov_lab_report_path = await uploadBytes(
        GovRef,
        req.files.gov_lab_report.data
      );
      const gov_lab_report_url = await getDownloadURL(
        ref(storage, gov_lab_report_path.metadata.fullPath)
      );
      await MinedBatch.findByIdAndUpdate(batch_id, {
        gov_lab_report_url: gov_lab_report_url,
      });
    }
    const batch_response = await MinedBatch.findByIdAndUpdate(batch_id, {
      status: status,
    });
    if (batch_response.status === "approved") {
      await Mine.findByIdAndUpdate(batch_response.mine_id, {
        $inc: {
          [`ores_available.${batch_response.type_of_ore}.${batch_response.grade}`]:
            parseInt(batch_response.quantity),
        },
      });
    }
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
