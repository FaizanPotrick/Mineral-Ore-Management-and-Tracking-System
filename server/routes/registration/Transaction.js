const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Organisation = require("../../models/OrganisationSchema");
const Transaction = require("../../models/TransactionSchema");

router.post("/api/registration/mine", async (req, res) => {
  const { _id } = req.cookies;
  const { organisation_id, type_of_ore, fe_percentage, grade, quantity, price } = req.body;
  const { invoice } = req.files;
  try {
    const mine_response = await Mine.findById(_id);
    const organisation_response = await Organisation.findById(organisation_id);
    await Transaction.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      ceo_id: organisation_response.ceo_id,
      buyer_org_id: organisation_id,
      type_of_ore: type_of_ore,
      fe_percentage: fe_percentage,
      grade: grade,
      quantity: quantity,
      price: price,
      invoice_url: invoice_url
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

module.exports = router;
