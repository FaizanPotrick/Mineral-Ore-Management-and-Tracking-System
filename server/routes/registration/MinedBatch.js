const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Mine = require("../../models/MineSchema");
const MinedBatch = require("../../models/MinedBatchSchema");
const BlockchainConnection = require("../../blockchain_scripts/connection");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const { Grade } = require("../../Constant");
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
  const { fe_percentage } = req.body;
  const { mine_lab_report } = req.files;
  const grade =
    parseInt(fe_percentage) >= Grade.high
      ? "high"
      : parseInt(fe_percentage) < Grade.medium &&
        parseInt(fe_percentage) >= Grade.low
      ? "medium"
      : "low";
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

router.post("/api/registration/approve_mined_batch", async (req, res) => {
  const { batch_id } = req.query;
  const { status } = req.body;
  try {
    // if (req.files.gov_lab_report) {
    //   const GovRef = ref(
    //     storage,
    //     "/gov_lab_report/" + req.files.gov_lab_report.name
    //   );
    //   const gov_lab_report_path = await uploadBytes(
    //     GovRef,
    //     req.files.gov_lab_report.data
    //   );
    //   const gov_lab_report_url = await getDownloadURL(
    //     ref(storage, gov_lab_report_path.metadata.fullPath)
    //   );
    //   await MinedBatch.findByIdAndUpdate(batch_id, {
    //     gov_lab_report_url: gov_lab_report_url,
    //   });
    // }
    const batch_response = await MinedBatch.findByIdAndUpdate(batch_id, {
      status: status,
    });
    console.log("batch_response: ",batch_response)
    if (batch_response.status === "approved") {
      await Mine.findByIdAndUpdate(batch_response.mine_id, {
        $inc: {
          [`ores_available.${batch_response.type_of_ore}.${batch_response.grade}`]:
            parseInt(batch_response.quantity),
        },
      });
      // Add to chain
      let blockchain = new BlockchainConnection();
      await blockchain.connectToContract();
      // batch_id,mine_id,manager_id,amount,ore_type,grade,Fe_amount,sample_img,lab_doc,officer_id,state
      await blockchain.createMinedBatch(
        batch_id,
        batch_response.mine_id,
        batch_response.manager_id,
        batch_response.quantity,
        batch_response.type_of_ore,
        batch_response.grade,
        batch_response.fe_percentage,
        batch_response.sample_image_url,
        batch_response.mine_lab_report_url,
        batch_response.officer_id,
        "approved"
      );
    }
    res.status(200).json({
      message: "Successfully Registered",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "yo",
      type: "error",
    });
  }
});

module.exports = router;
