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
module.exports = router;
