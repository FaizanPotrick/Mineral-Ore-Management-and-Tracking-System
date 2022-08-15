const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Mine = require("../models/MineSchema");
const MinedBatch = require("../models/MinedBatchSchema");
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
// list start
router.get("/api/mined_batches/officer/district", async (req, res) => {
  const { auth } = req.cookies;
  const region_response = await Region.findOne({
    auth: auth,
  }).distinct("user_id");
  const mined_batch_response = await MinedBatch.find({
    officer_id: region_response,
    status: "pendding",
  });
  res.json(mined_batch_response);
});
router.get("/api/mined_batches/miner", async (req, res) => {
  const { _id } = req.cookies;
  const mined_batch_response = await MinedBatch.find({
    mine_id: _id,
  });
  res.json(mined_batch_response);
});
// list end
// get mined batch data start
router.get("/api/mined_batch", async (req, res) => {
  const { batch_id } = req.query;
  const storage = getStorage(app);
  const mined_batch_response = await MinedBatch.findById(batch_id);
  const sample_image_url = await getDownloadURL(
    ref(storage, mined_batch_response.sample_image_path)
  );
  const mine_lab_report_url = await getDownloadURL(
    ref(storage, mined_batch_response.mine_lab_report_path)
  );
  res.status(200).json({
    manager_id: mined_batch_response.manager_id,
    type_of_ore: mined_batch_response.type_of_ore,
    grade: mined_batch_response.grade,
    fe_percentage: mined_batch_response.fe_percentage,
    quantity: mined_batch_response.quantity,
    sample_image_url: sample_image_url,
    mine_lab_report_url: mine_lab_report_url,
  });
});
// get mined batch data end
// mined batch register start
router.post("/api/registration/mined_batch", async (req, res) => {
  const { _id } = req.cookies;
  const { type_of_ore, fe_percentage, grade, quantity } = req.body;
  const { sample_image, mine_lap_report } = req.files;
  try {
    let sample_image_path;
    let mine_lap_report_path;
    const mine_response = await Mine.findById(_id).select([
      "manager_id",
      "region_id",
      "warehouse_capacity",
      "ores_available",
    ]);
    const total_fine =
      mine_response.ores_available.fine.high +
      mine_response.ores_available.fine.medium +
      mine_response.ores_available.fine.low;
    const total_lump =
      mine_response.ores_available.lump.high +
      mine_response.ores_available.lump.medium +
      mine_response.ores_available.lump.low;
    const total_iron_pellet =
      mine_response.ores_available.iron_pellet.high +
      mine_response.ores_available.iron_pellet.medium +
      mine_response.ores_available.iron_pellet.low;
    if (
      mine_response.warehouse_capacity <
      total_fine + total_lump + total_iron_pellet
    ) {
      return res.status(201).json({
        message: "Warehouse capacity is less than the total ores available",
        type: "error",
      });
    }
    if (
      mine_response.warehouse_capacity <
      total_fine + total_lump + total_iron_pellet + parseInt(quantity)
    ) {
      return res.status(201).json({
        message: "Warehouse capacity is less than the quantity",
        type: "error",
      });
    }
    const region_response = await Region.findById(
      mine_response.region_id
    ).distinct("officer_id");
    const storage = getStorage(app);
    const imageRef = ref(storage, "/sample_image/" + sample_image.name);
    const documentRef = ref(
      storage,
      "/mine_lab_report/" + mine_lap_report.name
    );
    await uploadBytes(imageRef, sample_image.data).then((snapshot) => {
      sample_image_path = snapshot.metadata.fullPath;
    });
    await uploadBytes(documentRef, mine_lap_report.data).then((snapshot) => {
      mine_lap_report_path = snapshot.metadata.fullPath;
    });
    await MinedBatch.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      officer_id: region_response[0],
      type_of_ore: type_of_ore,
      grade: grade,
      fe_percentage: parseInt(fe_percentage),
      quantity: parseInt(quantity),
      sample_image_path: sample_image_path,
      mine_lab_report_path: mine_lap_report_path,
    });
    await Mine.findByIdAndUpdate(_id, {
      $inc: {
        [`ores_available.${type_of_ore}.${grade}`]: parseInt(quantity),
      },
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
// mined batch register end
module.exports = router;
