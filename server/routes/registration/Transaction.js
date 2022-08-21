const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Organisation = require("../../models/OrganisationSchema");
const Transaction = require("../../models/TransactionSchema");
const Region = require("../../models/RegionSchema");
const SuspiciousActivity = require("../../models/SuspiciousActivity");
const { initializeApp } = require("firebase/app");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  const {
    organisation_id,
    type_of_ore,
    fe_percentage,
    grade,
    quantity,
    price,
  } = req.body;
  const { invoice } = req.files;
  try {
    const mine_response = await Mine.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(_id) },
      },
      {
        $project: {
          _id: 0,
          manager_id: 1,
          region_id: 1,
          grade: `$ores_available.${type_of_ore}.${grade}`,
        },
      },
    ]);
    if (mine_response.length !== 0 && mine_response[0].grade < quantity) {
      return res.status(201).json({
        message: "Not enough ore in the warehouse",
        type: "warning",
      });
    }
    const organisation_response = await Organisation.findById(organisation_id)
      .select(["ceo_id"])
      .lean();
    const region_response = await Region.findById(mine_response[0].region_id);
    const storage = getStorage(app);
    const invoiceRef = ref(storage, "/invoice_report/" + invoice.name);
    const invoice_path = await uploadBytes(invoiceRef, invoice.data);
    const invoice_url = await getDownloadURL(
      ref(storage, invoice_path.metadata.fullPath)
    );
    const transaction_response = await Transaction.create({
      mine_id: _id,
      manager_id: mine_response[0].manager_id,
      ceo_id: organisation_response.ceo_id,
      buyer_org_id: organisation_id,
      type_of_ore: type_of_ore,
      fe_percentage: fe_percentage,
      grade: grade,
      quantity: quantity,
      price: price,
      transaction_hash: bcrypt.hashSync(
        JSON.stringify({
          mine_id: _id,
          manager_id: mine_response[0].manager_id,
          ceo_id: organisation_response.ceo_id,
          buyer_org_id: organisation_id,
          type_of_ore: type_of_ore,
          fe_percentage: fe_percentage,
          grade: grade,
          quantity: quantity,
          price: price,
        }),
        10
      ),
      invoice_url: invoice_url,
    });
    await Mine.findByIdAndUpdate(_id, {
      $inc: {
        [`ores_available.${type_of_ore}.${grade}`]: -parseInt(quantity),
      },
    });
    const today = new Date();
    const mine_average_price_response = await Transaction.aggregate([
      {
        $match: {
          mine_id: _id,
          type_of_ore: type_of_ore,
          grade: grade,
          createdAt: {
            $gte: new Date(new Date(today).setMonth(today.getMonth() - 1)),
            $lt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: 0,
          price: {
            $avg: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    const mine_response_ids = await Mine.find({
      region_id: region_response._id,
    })
      .distinct("_id")
      .lean();
    const mine_ids = mine_response_ids.map((mine) => mine._id.toString());
    const region_average_price_response = await Transaction.aggregate([
      {
        $match: {
          mine_id: {
            $in: mine_ids,
          },
          type_of_ore: "lump",
          grade: "low",
          createdAt: {
            $gte: new Date(new Date(today).setMonth(today.getMonth() - 1)),
            $lt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: 0,
          price: {
            $avg: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    const average_price =
      mine_average_price_response.length !== 0
        ? mine_average_price_response[0].price
        : 500;
    const acceptable_difference =
      region_average_price_response.length !== 0
        ? region_average_price_response[0].price
        : 500;
    const actual_difference = Math.abs(100 - (price * 100) / average_price);
    if (actual_difference > acceptable_difference) {
      await SuspiciousActivity.create({
        region_id: region_response._id,
        type_of_activity: "transaction",
        reason: "price for difference too high",
        price_difference: actual_difference,
        transaction_id: transaction_response._id,
      });
    }
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

router.post("/api/transaction/organisation", async (req, res) => {
  const { _id } = req.cookies;
  const { transaction_id } = req.query;
  const { status } = req.body;
  try {
    const transaction_response = await Transaction.findByIdAndUpdate(
      transaction_id,
      {
        status: status,
      }
    );
    if (status === "delivered") {
      await Organisation.findByIdAndUpdate(_id, {
        $inc: {
          [`ores_bought.${transaction_response.type_of_ore}.${transaction_response.grade}`]:
            transaction_response.quantity,
        },
      });
    } else {
      await Mine.findByIdAndUpdate(transaction_response.mine_id, {
        $inc: {
          [`ores_available.${transaction_response.type_of_ore}.${transaction_response.grade}`]:
            transaction_response.quantity,
        },
      });
    }
    res.status(200).json({
      message: "Successfully Updated Transaction",
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

router.post("/api/transaction/checkpoint", async (req, res) => {
  const { _id } = req.cookies;
  const { transaction_id } = req.query;
  const { status } = req.body;
  try {
    const transaction_response = await Transaction.findById(transaction_id);
    if (!transaction_response.checkpoints.includes(_id)) {
      await Transaction.findByIdAndUpdate(transaction_id, {
        $push: {
          checkpoints: _id,
        },
      });
    }
    if (status === "cancelled") {
      await Transaction.findByIdAndUpdate(transaction_id, {
        status: "cancelled",
      });
      await Mine.findByIdAndUpdate(transaction_response.mine_id, {
        $inc: {
          [`ores_available.${transaction_response.type_of_ore}.${transaction_response.grade}`]:
            transaction_response.quantity,
        },
      });
    }
    res.status(200).json({
      message: "Successfully Updated Transaction",
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
