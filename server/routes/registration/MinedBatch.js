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
router.post("/api/registration/mined_batch", async (req, res) => {
  const { _id } = req.cookies;
  const { type_of_ore, fe_percentage, grade, quantity } = req.body;
  const { sample_image, mine_lap_report } = req.files;
  try {
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
      console.log("get");
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
    const sample_image_path = await uploadBytes(imageRef, sample_image.data);
    const mine_lap_report_path = await uploadBytes(
      documentRef,
      mine_lap_report.data
    );
    const sample_image_url = await getDownloadURL(
      ref(storage, sample_image_path.metadata.fullPath)
    );
    const mine_lap_report_url = await getDownloadURL(
      ref(storage, mine_lap_report_path.metadata.fullPath)
    );
    await MinedBatch.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      officer_id: region_response[0],
      type_of_ore: type_of_ore,
      grade: grade,
      fe_percentage: parseInt(fe_percentage),
      quantity: parseInt(quantity),
      sample_image_url: sample_image_url,
      mine_lab_report_url: mine_lap_report_url,
    });
    // await Mine.findByIdAndUpdate(_id, {
    //   $inc: {
    //     [`ores_available.${type_of_ore}.${grade}`]: parseInt(quantity),
    //   },
    // });
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
  // const { gov_lab_report } = req.files;
  try {
    const batch_response = await MinedBatch.findByIdAndUpdate(batch_id, {
      status: status,
    });
    if (status === "approved") {
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
