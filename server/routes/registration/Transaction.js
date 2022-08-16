const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Organisation = require("../../models/OrganisationSchema");
const Transaction = require("../../models/TransactionSchema");

router.post("/api/registration/mine", async (req, res) => {
  const { _id } = req.cookies;
  const { organisation_id, quantity_of_ore, type_of_ore, grade, price } =
    req.body;
  try {
    const mine_response = await Mine.findById(_id);
    const organisation_response = await Organisation.findById(organisation_id);
    await Transaction.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      ceo_id: organisation_response.ceo_id,
      buyer_org_id: organisation_id,
      type_of_ore: type_of_ore,
      quantity_of_ore: quantity_of_ore,
      grade: grade,
      price: price,
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
