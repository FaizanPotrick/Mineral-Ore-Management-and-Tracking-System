const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Warehouse = require("../../models/WarehouseSchema");
const MinedBatch = require("../../models/MinedBatchSchema");
const TestedMinedBatch = require("../../models/TestedMinedBatchSchema");
const bcrypt = require("bcrypt");
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

router.post("/api/registration/tested_mined_batch/miner", async (req, res) => {
  const { _id } = req.cookies;
  const { mined_batch_id } = req.query;
  const { type_of_ore, fe_percentage, quantity } = req.body;
  const { sample_image, mine_lab_report } = req.files;
  const grade =
    parseInt(fe_percentage) >= Grade.high
      ? "high"
      : parseInt(fe_percentage) < Grade.medium &&
        parseInt(fe_percentage) >= Grade.low
      ? "medium"
      : "low";
  try {
    const mine_response = await Mine.findById(_id)
      .select(["manager_id", "region_id"])
      .lean();
    const imageRef = ref(storage, "/sample_image/" + sample_image.name);
    const documnetRef = ref(
      storage,
      "/mine_lab_report/" + mine_lab_report.name
    );
    const sample_image_path = await uploadBytes(imageRef, sample_image.data);
    const mine_lab_report_path = await uploadBytes(
      documnetRef,
      mine_lab_report.data
    );
    const sample_image_url = await getDownloadURL(
      ref(storage, sample_image_path.metadata.fullPath)
    );
    const mine_lab_report_url = await getDownloadURL(
      ref(storage, mine_lab_report_path.metadata.fullPath)
    );
    await TestedMinedBatch.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      type_of_ore: type_of_ore,
      fe_percentage: fe_percentage,
      grade: grade,
      quantity: quantity,
      tested_mined_batch_hash: bcrypt.hashSync(
        JSON.stringify({
          mine_id: _id,
          manager_id: mine_response.manager_id,
          type_of_ore: type_of_ore,
          fe_percentage: fe_percentage,
          grade: grade,
          quantity: parseInt(quantity),
          status: "dispatched",
          sample_image_url: sample_image_url,
          mine_lab_report_url: mine_lab_report_url,
        }),
        10
      ),
      sample_image_url: sample_image_url,
      mine_lab_report_url: mine_lab_report_url,
    });
    await MinedBatch.findByIdAndUpdate(mined_batch_id, {
      status: "approved",
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

router.get(
  "/api/registration/tested_mined_batch/warehouse",
  async (req, res) => {
    const { _id } = req.cookies;
    const { tested_mined_batch_id } = req.query;
    try {
      const tested_mined_batch = await TestedMinedBatch.findByIdAndUpdate(
        tested_mined_batch_id,
        {
          status: "delivered",
        }
      ).lean();
      await Warehouse.findByIdAndUpdate(_id, {
        $inc: {
          [`ores_available.${tested_mined_batch.grade}.${tested_mined_batch.type_of_ore}`]:
            tested_mined_batch.quantity,
        },
      });
      res.status(200).json({
        message: "Updated Tested Mined Batch",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Invalid Request",
        type: "error",
      });
    }
  }
);

module.exports = router;
