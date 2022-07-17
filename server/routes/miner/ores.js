const express = require("express");
const router = express.Router();
const Ores = require("../../models/OresSchema");

router.post("/api/miner/ores_registration", async (req, res, next) => {
  const { type, grade, quantity, document } = req.body;
  try {
    if (!type || !grade || !quantity || !document) {
      return res.status(201).json({
        message: "Please fill all the required fields correctly",
        type: "error",
      });
    }
    const auth =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const response = await new Ores({
      auth: auth,
      type: type,
      grade: grade,
      quantity: quantity,
      document: document,
    });
    await response.save();
    res.status(200).json({
      message: "Successfully Registered",
      type: "success",
    });
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});
module.exports = router;
