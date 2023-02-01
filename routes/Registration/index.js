const express = require("express");
const moment = require("moment");
const ShortUniqueId = require("short-unique-id");

const User = require("../../models/User");
const Region = require("../../models/Region");
const Organization = require("../../models/Organization");
const Mine = require("../../models/Mine");
const Warehouse = require("../../models/Warehouse");
const CheckPoint = require("../../models/CheckPoint");
const Lab = require("../../models/Lab");
const Email = require("../../middleware/Email");

const router = express.Router();
const id_generate = new ShortUniqueId({
  length: 8,
});

router.post("/api/registration/region/country", async (req, res) => {
  try {
    await Region.create({
      type_of_region: "country",
      coordinates: {
        latitude: 20.5937,
        longitude: 78.9629,
      },
    });
    res.status(200).end();
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/api/registration/region/states", async (req, res) => {
  try {
    req.body.map(async (region) => {
      await Region.create({
        type_of_region: "state",
        state: region.state,
        coordinates: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      });
    });
    res.status(200).end();
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/api/registration/region/districts", async (req, res) => {
  try {
    req.body.map(async (region) => {
      await Region.create({
        type_of_region: "district",
        state: region.state,
        district: region.district,
        coordinates: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      });
    });
    res.status(200).end();
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/api/registration/government", async (req, res) => {
  const { name, email_address, type_of_region, region } = req.body;
  const region_response = await Region.findOne({
    type_of_region: type_of_region,
    [type_of_region]: region,
  }).lean();
  if (region_response === null) {
    return res.status(400).json({
      message: "Region not found",
      type: "warning",
    });
  }
  const officer_id = id_generate();
  const password = id_generate();
  try {
    if (region_response.officer_id !== undefined) {
      await User.findOneAndUpdate(
        {
          user_id: region_response.officer_id,
        },
        {
          is_valid: false,
        }
      );
    }
    await User.create({
      user_id: officer_id,
      type_of_user: "government",
      user_name: name,
      email_address: email_address,
      password: password,
    });
    await Region.findOneAndUpdate(
      {
        _id: region_response._id,
      },
      {
        officer_id: officer_id,
      }
    );
    res.status(200).end();
    Email(officer_id, name, "Government", email_address, password);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.post("/api/registration/organization", async (req, res) => {
  const { organization_name, address, name, email_address, gst_no } = req.body;
  const organization_check = await Organization.findOne({
    gst_no: gst_no,
  }).lean();
  if (organization_check !== null) {
    return res.status(400).json({
      message: "GST Number already exist",
      type: "warning",
    });
  }
  const ceo_id = id_generate();
  const password = id_generate();
  const user = new User({
    user_id: ceo_id,
    type_of_user: "organization",
    user_name: name,
    email_address: email_address,
    password: password,
  });
  const organization = new Organization({
    ceo_id: ceo_id,
    organization_name: organization_name,
    gst_no: gst_no,
    address: address,
  });
  try {
    await Promise.all([user.validate(), organization.validate()]);
    await Promise.all([user.save(), organization.save()]);
    res.status(200).end();
    Email(ceo_id, name, "Organization", email_address, password);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.post("/api/registration/mine", async (req, res) => {
  const { _id } = req.cookies;
  const { mine_name, name, email_address, period, coordinates } = req.body;
  const manager_id = id_generate();
  const password = id_generate();
  const today = new Date();
  const user = new User({
    user_id: manager_id,
    type_of_user: "mine",
    user_name: name,
    email_address: email_address,
    password: password,
  });
  const mine = new Mine({
    manager_id: manager_id,
    region_id: _id,
    mine_name: mine_name,
    coordinates: coordinates,
    lease_period: {
      from: moment(today).format("DD MMM YYYY"),
      period: parseInt(period),
      to: moment(today).add(parseInt(period), "months").format("DD MMM YYYY"),
    },
  });
  try {
    await Promise.all([user.validate(), mine.validate()]);
    await Promise.all([user.save(), mine.save()]);
    res.status(200).json(mine._id);
    Email(manager_id, name, "Mine", email_address, password);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.post("/api/registration/warehouse", async (req, res) => {
  const { name, email_address } = req.body;
  const { mine_id } = req.query;
  const manager_id = id_generate();
  const password = id_generate();
  const user = new User({
    user_id: manager_id,
    type_of_user: "warehouse",
    user_name: name,
    email_address: email_address,
    password: password,
  });
  const warehouse = new Warehouse({
    mine_id: mine_id,
    manager_id: manager_id,
  });
  try {
    await Promise.all([user.validate(), warehouse.validate()]);
    await Promise.all([user.save(), warehouse.save()]);
    res.status(200).end();
    Email(manager_id, name, "Warehouse", email_address, password);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.post("/api/registration/checkpoint", async (req, res) => {
  const { _id } = req.cookies;
  const { name, email_address, coordinates } = req.body;
  const officer_id = id_generate();
  const password = id_generate();
  const user = new User({
    user_id: officer_id,
    type_of_user: "checkpoint",
    user_name: name,
    email_address: email_address,
    password: password,
  });
  const checkpoint = new CheckPoint({
    officer_id: officer_id,
    region_id: _id,
    coordinates: coordinates,
  });
  try {
    await Promise.all([user.validate(), checkpoint.validate()]);
    await Promise.all([user.save(), checkpoint.save()]);
    res.status(200).end();
    Email(officer_id, name, "Check Point", email_address, password);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

router.post("/api/registration/lab", async (req, res) => {
  const { _id } = req.cookies;
  const { lab_name, name, email_address, coordinates } = req.body;
  const manager_id = id_generate();
  const password = id_generate();
  const user = new User({
    user_id: manager_id,
    type_of_user: "lab",
    user_name: name,
    email_address: email_address,
    password: password,
  });
  const lab = new Lab({
    manager_id: manager_id,
    region_id: _id,
    lab_name: lab_name,
    coordinates: coordinates,
  });
  try {
    await Promise.all([user.validate(), lab.validate()]);
    await Promise.all([user.save(), lab.save()]);
    res.status(200).end();
    Email(manager_id, name, "Lab", email_address, password);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Request",
      type: "error",
    });
  }
});

module.exports = router;
