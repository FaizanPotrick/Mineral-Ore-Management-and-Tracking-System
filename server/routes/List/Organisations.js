const express = require("express");
const router = express.Router();
const Organisation = require("../../models/OrganisationSchema");

router.get("/api/organisations/officer", async (req, res) => {
  const organisation_response = await Organisation.find();
  res.json(organisation_response);
});
module.exports = router;
