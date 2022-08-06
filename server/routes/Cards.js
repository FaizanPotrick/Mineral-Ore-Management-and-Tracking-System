const express = require("express");
const router = express.Router();
const Mine = require("../models/MineSchema");
const Organization = require("../models/OrganizationSchema");
const Region = require("../models/RegionSchema");
const moment = require("moment");

router.get("/api/maps/officer", async (req, res) => {
  const { _id, type_of_region } = req.cookies;
  if (type_of_region === "country") {
    const region_response = await Region.find({
      officer_id: { $exists: true },
    }).distinct("_id");
    const organization_response = await Organization.find().distinct("_id");
    const mine_response = await Mine.find().distinct("_id");
    return res.status(200).json([
      {
        title: "Total Number of Officers",
        value: region_response.length,
      },
      {
        title: "Total Number of Organizations",
        value: organization_response.length,
      },
      {
        title: "Total Number of Mines",
        value: mine_response.length,
      },
    ]);
  }
  if (type_of_region === "state") {
    const region_response = await Region.findById(_id).select("state");
    const region_officers = await Region.find({
      officer_id: { $exists: true },
      district: { $exists: true },
      state: region_response.state,
    }).distinct("_id");
    const organization_response = await Organization.find().distinct("_id");
    const mine_response = await Mine.find({
      region_id: region_officers,
    }).distinct("_id");
    return res.status(200).json([
      {
        title: "Total Number of Officers",
        value: region_officers.length,
      },
      {
        title: "Total Number of Organizations",
        value: organization_response.length,
      },
      {
        title: "Total Number of Mines",
        value: mine_response.length,
      },
    ]);
  }
  if (type_of_region === "district") {
    const mine_response = await Mine.find({ region_id: _id }).distinct("_id");
    return res.status(200).json([
      {
        title: "Total Number of Mines",
        value: mine_response.length,
      },
    ]);
  }
});
router.get("/api/cards/organization", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.find({ organization_id: _id }).distinct(
    "_id"
  );
  const organization_response = await Organization.findById(_id).select(
    "ores_bought"
  );
  res.status(200).json([
    {
      title: "Total Number of Mines",
      value: mine_response.length,
    },
    {
      title: "Total Fine Ores Bought",
      value: organization_response.ores_bought.fine,
    },
    {
      title: "Total Lump Ores Bought",
      value: organization_response.ores_bought.lump,
    },
    {
      title: "Total Iron Pellet Ores Bought",
      value: organization_response.ores_bought.iron_pellet,
    },
  ]);
});
router.get("/api/cards/mine", async (req, res) => {
  const { _id } = req.cookies;
  const mine_response = await Mine.findById(_id).select([
    "area",
    "warehouse_capacity",
    "ores_available",
    "lease_period",
  ]);
  res.status(200).json([
    {
      title: "Mine Area(in sq.)",
      value: mine_response.area,
    },
    {
      title: "Warehouse Capacity(in mt)",
      value: mine_response.warehouse_capacity,
    },
    {
      title: "Total Fine Ores Available(in mt)",
      value: mine_response.ores_available.fine,
    },
    {
      title: "Total Lump Ores Available(in mt)",
      value: mine_response.ores_available.lump,
    },
    {
      title: "Total Iron Pellet Ores Available(in mt)",
      value: mine_response.ores_available.iron_pellet,
    },
    {
      title: "Lease Period",
      value: moment(mine_response.lease_period.to).format("DD MMM YYYY"),
    },
  ]);
});
module.exports = router;
