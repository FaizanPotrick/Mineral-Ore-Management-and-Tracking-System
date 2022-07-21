const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Organization = require("../../models/OrganizationSchema");
const User = require("../../models/UserSchema")
const jwt = require("jsonwebtoken");
const ShortUniqueId = require("short-unique-id");
const RegistrationEmailSender = require("../../middleware/RegistrationEmailSender");

router.post(
    "/api/miner/registration",
    async (req, res, next) => {
            const {
                organization_name,
                ceo_name,
                aadhar_card,
                email_address,
                phone_no,
                gst_no,
                address,
            } = req.body;
            try {
                if (
                    !organization_name ||
                    !ceo_name ||
                    !aadhar_card ||
                    !email_address ||
                    !phone_no ||
                    !gst_no ||
                    !address
                ) {
                    return res.status(201).json({
                        message: "Please fill all the required fields correctly",
                        type: "error",
                    });
                }
                const organization_check = await Organization.find({
                    gst_no: gst_no,
                });
                if (organization_check.length !== 0) {
                    return res.status(201).json({
                        message: "Organization with provided gst number already exist",
                        type: "warning",
                    });
                }
                const organization_id_genarate = new ShortUniqueId({
                    length: 10
                });
                const ceo_id_genarate = new ShortUniqueId({
                    length: 10
                });
                const password_generate = new ShortUniqueId({
                    length: 8
                });
                const organization_id = organization_id_genarate();
                const ceo_id = ceo_id_genarate();
                const password = password_generate();
                const auth = jwt.sign({
                    auth_id: ceo_id
                }, aadhar_card);
                const organization_response = await new Organization({
                    organization_id: organization_id,
                    ceo_id: ceo_id,
                    organization_name: organization_name,
                    gst_no: gst_no,
                    address: address,
                });
                const user_response = await new User({
                    auth: auth,
                    user_id: ceo_id,
                    type_of_user: "organization",
                    user_name: ceo_name,
                    aadhar_card: aadhar_card,
                    email_address: email_address,
                    phone_no: phone_no,
                    password: bcrypt.hashSync(password, 10),
                    c_password: bcrypt.hashSync(password, 10),
                })
                await organization_response.save();
                await user_response.save();
                req.credentials = {
                    user_id: ceo_id,
                    user_name: ceo_name,
                    email_address: email_address,
                    password: password
                }
                res.status(200).json({
                    message: "Organization is Successfully Registered",
                    type: "success",
                });
                next();
            } catch (error) {
                res.status(400).json({
                    message: "Invalid Request",
                    type: "error",
                });
            }
        },
        RegistrationEmailSender
);
module.exports = router;