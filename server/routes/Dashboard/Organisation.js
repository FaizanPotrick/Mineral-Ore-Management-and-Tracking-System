const express = require("express");
const router = express.Router();
const Organisation = require("../../models/OrganisationSchema");
const Mine = require("../../models/MineSchema");

router.get("/api/dashboard/organisation", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.organisation_id) {
    _id = req.query.organisation_id;
  }
  const organisation_response = await Organisation.findById(_id).select([
    "organisation_name",
    "ores_bought",
  ]);
  const mine_response = await Mine.find({ organisation_id: _id }).select(
    "location.coordinates"
  );
  const mine_list_response = mine_response.map((mine) => {
    return {
      _id: mine._id,
      coordinates: [
        mine.location.coordinates.longitude,
        mine.location.coordinates.latitude,
      ],
    };
  });
  res.json({
    company_name: organisation_response.organisation_name,
    cards: [
      {
        title: "Total Mines",
        value: mine_response.length,
      },
      {
        title: "Total Fine Ores Bought(in mt)",
        value: organisation_response.ores_bought.fine,
      },
      {
        title: "Total Lump Ores Bought(in mt)",
        value: organisation_response.ores_bought.lump,
      },
      {
        title: "Total Iron Pellet Ores Bought(in mt)",
        value: organisation_response.ores_bought.iron_pellet,
      },
    ],
    markers: mine_list_response,
  });
});
module.exports = router;
