const express = require("express");
const router = express.Router();
const Organization = require("../models/OrganizationSchema");

router.get("/api/organization/officer", async (req, res) => {
  const organization_response = await Organization.find();
  res.json(organization_response);
});
module.exports = router;
