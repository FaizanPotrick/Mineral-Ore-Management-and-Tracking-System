const express = require("express");
const router = express.Router();
const Mine = require("../../models/MineSchema");
const Warehouse = require("../../models/WarehouseSchema");
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
const { Grade, AcceptablePercentage } = require("../../Constant");

const app = initializeApp({
  storageBucket: process.env.BUCKET_URL,
});
const storage = getStorage(app);

router.post("/api/registration/transaction/miner", async (req, res) => {
  const { _id } = req.cookies;
  const {
    organisation_id,
    type_of_ore,
    grade,
    quantity, // array of quantity
    price,
    // total_vehicles,
    royalty,
    vehicle_no, // array of vehicle_no
    driving_license, // array of driving license
  } = req.body;
  const { invoice } = req.files;

  try {
    const mine_response = await Mine.findById(_id)
      .select(["manager_id", "region_id"])
      .lean();

    const warehouse_response = await Warehouse.aggregate([
      {
        $match: { mine_id: _id },
      },
      {
        $project: {
          _id: 0,
          grade: `$ores_available.${grade}.${type_of_ore}`,
        },
      },
    ]);
    if (
      warehouse_response.length !== 0 &&
      warehouse_response[0].grade <= quantity
    ) {
      return res.status(201).json({
        message: "Not enough ore in the warehouse",
        type: "warning",
      });
    }
    const organisation_response = await Organisation.findById(organisation_id)
      .select(["ceo_id"])
      .lean();

    const region_response = await Region.findById(mine_response.region_id);
    const invoiceRef = ref(storage, "/invoice_report/" + invoice.name);
    const invoice_path = await uploadBytes(invoiceRef, invoice.data);
    const invoice_url = await getDownloadURL(
      ref(storage, invoice_path.metadata.fullPath)
    );

    const transaction_response = await Transaction.create({
      mine_id: _id,
      manager_id: mine_response.manager_id,
      ceo_id: organisation_response.ceo_id,
      buyer_org_id: organisation_id,
      type_of_ore: type_of_ore,
      grade: grade,
      quantity: quantity,
      price: price,
      driving_license: driving_license,
      royalty: royalty,
      transaction_hash: bcrypt.hashSync(
        JSON.stringify({
          mine_id: _id,
          // manager_id: mine_response.manager_id,
          ceo_id: organisation_response.ceo_id,
          buyer_org_id: organisation_id,
          type_of_ore: type_of_ore,

          grade: grade,
          quantity: quantity,
          price: price,
          royalty: royalty,
          driving_license: driving_license,
          vehicle_no: vehicle_no,
          invoice_url: invoice_url,
        }),
        10
      ),
      vehicle_no: vehicle_no,
      invoice_url: invoice_url,
    });

    await Warehouse.findOneAndUpdate(
      { mine_id: _id },
      {
        $inc: {
          [`ores_available.${grade}.${type_of_ore}`]: -parseInt(quantity),
        },
      }
    );
    const mine_average_price_response = await Transaction.aggregate([
      {
        $match: {
          mine_id: _id,
          type_of_ore: type_of_ore,
          grade: grade,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
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
    }).distinct("_id");
    const mine_ids = mine_response_ids.map((mine) => mine._id.toString());
    const region_average_price_response = await Transaction.aggregate([
      {
        $match: {
          mine_id: {
            $in: mine_ids,
          },
          type_of_ore: type_of_ore,
          grade: grade,
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
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
    console.log("mine_average_price_response", mine_average_price_response);
    console.log("region_average_price_response", region_average_price_response);
    const acceptable_difference = AcceptablePercentage;
    if (
      mine_average_price_response.length !== 0 &&
      region_average_price_response.length !== 0
    ) {
      const mine_actual_difference = Math.abs(
        100 - (parseInt(price) * 100) / mine_average_price_response[0].price
      );
      const region_actual_difference = Math.abs(
        100 - (parseInt(price) * 100) / region_average_price_response[0].price
      );
      if (mine_actual_difference > acceptable_difference) {
        await SuspiciousActivity.create({
          region_id: region_response._id,
          mine_id: _id,
          type_of_activity: "transaction",
          reason: `price difference by more then ${acceptable_difference} % wrt mine average price`,
          price_difference: mine_actual_difference,
          transaction_id: transaction_response._id,
        });
      }
      if (region_actual_difference > acceptable_difference) {
        await SuspiciousActivity.create({
          region_id: region_response._id,
          mine_id: _id,
          type_of_activity: "transaction",
          reason: `price difference by more then ${acceptable_difference} wrt region average price`,
          price_difference: region_actual_difference,
          transaction_id: transaction_response._id,
        });
      }
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

router.get(
  "/api/registration/transaction/officer/district",
  async (req, res) => {
    const { transaction_id } = req.query;
    await Transaction.findByIdAndUpdate(transaction_id, {
      status: "dispatched",
    });
    res.end();
  }
);

router.post("/api/registration/transaction/organisation", async (req, res) => {
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
    if (transaction_response.status === "delivered") {
      await Organisation.findByIdAndUpdate(_id, {
        $inc: {
          [`ores_bought.${transaction_response.grade}.${transaction_response.type_of_ore}`]:
            transaction_response.quantity,
        },
      });
    } else {
      await Warehouse.findByIdAndUpdate(transaction_response.mine_id, {
        $inc: {
          [`ores_available.${transaction_response.grade}.${transaction_response.type_of_ore}`]:
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

router.post("/api/registration/transaction/checkpoint", async (req, res) => {
  const { _id } = req.cookies;
  const { transaction_id } = req.query;
  const { status } = req.body;
  try {
    const transaction_response = await Transaction.findById(transaction_id);
    if (
      transaction_response.checkpoints.filter((checkpoint) => {
        return checkpoint.checkpoint_id === _id;
      }).length === 0
    ) {
      await Transaction.findByIdAndUpdate(transaction_id, {
        $push: {
          checkpoints: checkpoint,
        },
      });
    }
    if (status === "cancelled") {
      await Transaction.findByIdAndUpdate(transaction_id, {
        status: "cancelled",
      });
      await Warehouse.findByIdAndUpdate(transaction_response.mine_id, {
        $inc: {
          [`ores_available.${transaction_response.grade}.${transaction_response.type_of_ore}`]:
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
