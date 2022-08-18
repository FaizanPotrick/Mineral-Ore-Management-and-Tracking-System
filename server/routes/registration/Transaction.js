const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Organisation = require("../../models/OrganisationSchema");
const Transaction = require("../../models/TransactionSchema");
const Region = require("../../models/RegionSchema");
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

router.post("/api/registration/transaction", async (req, res) => {
  const { _id } = req.cookies;
  const { organisation_id, type_of_ore, fe_percentage, grade, quantity, price } = req.body;
  const { invoice } = req.files;
  try {
    const mine_response = await Mine.findById(_id).select([
      "manager_id",
      "region_id"
    ]);
    const organisation_response = await Organisation.findById(organisation_id).select([
      "ceo_id",
    ]);
    const region_response = await Region.findById(mine_response.region_id)
    const storage = getStorage(app);
    const invoiceRef = ref(storage, "/invoice_report/" + invoice.name);
    const invoice_path = await uploadBytes(invoiceRef, invoice.data)
    const invoice_url = await getDownloadURL(ref(storage, invoice_path.metadata.fullPath))
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
