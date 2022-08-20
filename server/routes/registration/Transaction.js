const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Organisation = require("../../models/OrganisationSchema");
const Transaction = require("../../models/TransactionSchema");
const Region = require("../../models/RegionSchema");
const MinedBatch = require("../../models/MinedBatchSchema");
const SuspiciousActivity = require("../../models/SuspiciousActivity");
const { initializeApp } = require("firebase/app");
const mongoose = require("mongoose");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const app = initializeApp({
  storageBucket: process.env.BUCKET_URL,
});

// balance before create the transaction

router.post("/api/registration/transaction", async (req, res) => {
  // const { _id } = req.cookies;
  const {
    organisation_id,
    type_of_ore,
    fe_percentage,
    grade,
    quantity,
    price,
  } = req.body;
  // const { invoice } = req.files;
  const _id = "62ff871dcc646fe63c36134e";
  try {
    const mine_response = await Mine.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(_id) },
      },
      {
        $project: {
          _id: 1,
          ores_available: {
            $filter: {
              input: "$ores_available",
              as: "ores_available",
              cond: { $eq: ["$$ores_available.type_of_ore", type_of_ore] },
            },
          },
        },
      },
    ]);
    // const ores_available = mine_response[0].ores_available;
    // console.log(`${ores_available}.${type_of_ore}`);
    // if (
    //   `${mined_batch_response}.ores_available.${type_of_ore}.${grade}` >=
    //   quantity
    // ) {
    //   console.log("quantity is less than available");
    // }
    res.json(mine_response);
    // const mine_response = await Mine.findById(_id)
    //   .select(["manager_id", "region_id", "average_price"])
    //   .lean();
    // const organisation_response = await Organisation.findById(organisation_id)
    //   .select(["ceo_id"])
    //   .lean();
    // const region_response = await Region.findById(mine_response.region_id);
    // const storage = getStorage(app);
    // const invoiceRef = ref(storage, "/invoice_report/" + invoice.name);
    // const invoice_path = await uploadBytes(invoiceRef, invoice.data);
    // const invoice_url = await getDownloadURL(
    //   ref(storage, invoice_path.metadata.fullPath)
    // );
    // const transaction_response = await Transaction.create({
    //   mine_id: _id,
    //   manager_id: mine_response.manager_id,
    //   ceo_id: organisation_response.ceo_id,
    //   buyer_org_id: organisation_id,
    //   type_of_ore: type_of_ore,
    //   fe_percentage: fe_percentage,
    //   grade: grade,
    //   quantity: quantity,
    //   price: price,
    //   invoice_url: invoice_url,
    // });
    // const today = new Date();
    // const price_response = await Transaction.aggregate([
    //   {
    //     $match: {
    //       mine_id: "62ff871dcc646fe63c36134e",
    //       type_of_ore: "lump",
    //       grade: "low",
    //       createdAt: {
    //         $gte: new Date(new Date(today).setMonth(today.getMonth() - 1)),
    //         $lt: new Date(),
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: 0,
    //       price: {
    //         $avg: "$price",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //     },
    //   },
    // ]);
    // priceEvaluation(
    //   price_response[0].price,
    //   parseInt(price),
    //   transaction_response._id,
    //   region_response
    // );
    // async function priceEvaluation(
    //   average_price,
    //   price,
    //   transaction_id,
    //   region_response
    // ) {
    //   const acceptable_difference =
    //     region_response.acceptable_price_percentage_difference;
    //   const actual_difference = Math.abs(100 - (price * 100) / average_price);
    //   if (actual_difference > acceptable_difference) {
    //     console.log("price for transaction on " + id + " is not acceptable");
    //     await SuspiciousActivity.create({
    //       type_of_activity: "transaction",
    //       reason: "price for difference too high",
    //       price_difference: actual_difference,
    //       region_id: region_response._id,
    //       transaction_id: transaction_id,
    //     });
    //   }
    // }
    // res.status(200).json({
    //   message: "Successfully Registered",
    //   type: "success",
    // });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

module.exports = router;
