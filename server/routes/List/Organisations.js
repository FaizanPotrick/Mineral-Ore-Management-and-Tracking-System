const express = require("express");
const router = express.Router();
const Organisation = require("../../models/OrganisationSchema");
const Mine = require("../../models/MineSchema");

router.get("/api/organisations/officer", async (req, res) => {
  const organisation_response = await Organisation.find();
  res.json(organisation_response);
});

router.get("/api/transaction/organisation_list", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.findById(_id).lean();
  const organisation_response = await Organisation.find({
    _id: { $nin: mine_response.organisation_id },
  }).select("organisation_name");
  res.status(200).json(organisation_response);
});
module.exports = router;
