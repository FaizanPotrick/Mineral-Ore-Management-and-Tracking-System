const express = require("express");
const router = express.Router();
const Organisation = require("../../models/OrganisationSchema");
const Mine = require("../../models/MineSchema");
const moment = require("moment");

router.get("/api/dashboard/miner", async (req, res) => {
  let _id = req.cookies._id;
  if (req.query.mine_id) {
    _id = req.query.mine_id;
  }
  const mine_response = await Mine.findById(_id).select([
    "organisation_id",
    "area",
    "warehouse_capacity",
    "ores_available",
    "lease_period",
  ]);
  const organisation_response = await Organisation.findById(
    mine_response.organisation_id
  ).distinct("organisation_name");
  const total_fine =
    mine_response.ores_available.fine.high +
    mine_response.ores_available.fine.medium +
    mine_response.ores_available.fine.low;
  const total_lump =
    mine_response.ores_available.lump.high +
    mine_response.ores_available.lump.medium +
    mine_response.ores_available.lump.low;
  const total_iron_pellet =
    mine_response.ores_available.iron_pellet.high +
    mine_response.ores_available.iron_pellet.medium +
    mine_response.ores_available.iron_pellet.low;
  res.json({
    company_name: organisation_response[0],
    cards: [
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
        value: moment(new Date(mine_response.lease_period.to)).format(
          "DD MMM YYYY"
        ),
      },
    ],
    doughnut: {
      labels: ["Fine", "Lump", "Iron Pellet", "Empty"],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#E48665"],
          data: [
            total_fine,
            total_lump,
            total_iron_pellet,
            mine_response.warehouse_capacity -
              total_fine +
              total_lump +
              total_iron_pellet,
          ],
        },
      ],
    },
  });
});
module.exports = router;
