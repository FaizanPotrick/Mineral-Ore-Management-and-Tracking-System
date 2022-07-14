const express = require("express");
const router = express.Router();
const Ores = require("../../model/OresSchema");
// const { EmailSender } = require("../../middleware/EmailSender");

router.post("/ores_registration", async (req, res, next) => {
  const { type, grade, quantity, document } = req.body;
  try {
    if (!type || !grade || !quantity) {
      return res.status(201).json({
        message: "Please fill all the required fields correctly",
        type: "error",
      });
    }
    const response = await new Ores({
      type: type,
      grade: grade,
      quantity: quantity,
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
