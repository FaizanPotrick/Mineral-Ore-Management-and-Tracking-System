const express = require("express");
const router = express.Router();
const Region = require("../models/RegionSchema");
const Organisation = require("../models/OrganisationSchema");
const MinedBatch = require("../models/MinedBatchSchema");
router.get("/api/test", async (req, res) => {
  try {
    const email_address_check = await Organisation.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "ceo_id",
          foreignField: "user_id",
          as: "ceo_list",
        },
      },
      { $addFields: { _id: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "mines",
          localField: "_id",
          foreignField: "organisation_id",
          as: "mine_role",
        },
      },
      // {
      //   $unwind: "$mine_role",
      // },
      // {
      //   $match: {
      //     organisation_name: "new faizan company",
      //   },
      // },
      // {
      //   $project: {
      //     organisation_name: 1,
      //     user_list: {
      //       email_address: 1,
      //       user_name: 1,
      //     },
      //   },
      // },
      // {
      //   $sort: {
      //     organisation_name: -1,
      //   },
      // },
    ]);
    res.json(email_address_check);
  } catch (error) {
    console.log(error);
    res.status(400).json("Invalid Request");
  }
});
router.get(
  "/api/region_coordinates_and_organisation_list",
  async (req, res) => {
    const { type_of_region, _id } = req.cookies;
    const region_response = await Region.findOne({
      _id: _id,
      type_of_region: type_of_region,
    }).distinct("coordinates");
    const organisation_response = await Organisation.find().select(
      "organisation_name"
    );
    res.status(200).json({
      coordinates: region_response[0],
      organisations: organisation_response,
    });
  }
);
router.get("/api/region_list/country", async (req, res) => {
  const region_response = await Region.find({
    type_of_region: "state",
  }).distinct("state");
  res.status(200).json(region_response);
});
router.get("/api/region_list/state", async (req, res) => {
  const { type_of_region, _id } = req.cookies;
  const region_user = await Region.findOne({
    _id: _id,
    type_of_region: type_of_region,
  }).select("state");
  const region_response = await Region.find({
    type_of_region: "district",
    state: region_user.state,
  }).distinct("district");
  res.status(200).json(region_response);
});
module.exports = router;
