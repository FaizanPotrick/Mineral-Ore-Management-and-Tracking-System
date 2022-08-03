const express = require("express");
const router = express.Router();
const ShortUniqueId = require("short-unique-id");
const Ores = require("../../models/MinedBatchSchema");
router.post("/api/miner/ores_registration", async (req, res) => {
  const { type, grade, quantity } = req.body;
  try {
    if (!type || !grade || !quantity || req.files.length === 0) {
      return res.status(201).json({
        message: "Please fill all the required fields correctly",
        type: "error",
      });
    }
    const auth =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const uid = new ShortUniqueId({ length: 12 });
    const batch_id = uid();
    const response = await new Ores({
      auth: auth,
      batch_id: batch_id,
      type: type,
      grade: grade,
      quantity: quantity,
      document: req.files.document,
    });
    await response.save();
    res.status(200).json({
      message: "Successfully Registered",
      type: "success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
router.get("/api/miner/file", async (req, res) => {
  const response = await Ores.findById({ _id: "62d598c966a6a7c6be802756" });
  const file = Buffer.from(response.document.data).toString("base64");
  res.send(file);
});
module.exports = router;
