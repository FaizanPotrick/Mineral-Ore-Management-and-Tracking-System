const express = require("express");
const router = express.Router();
const User = require("../../models/UserSchema")

router.post("/api/login", async (req, res) => {
    const {
        user_id,
        password
    } = req.body;
    try {
        if (!user_id || !password) {
            return res.status(201).json({
                message: "Please fill all the required fields correctly",
                type: "error",
            });
        }
        const response = await User.find({
            user_id: user_id,
            is_valid: true
        });
        if (response.length === 0) {
            return res.status(201).json({
                message: "Invalid Credential",
                type: "error",
            });
        }
        const passwordMatch = await bcrypt.compare(password, response[0].password);
        if (!passwordMatch) {
            return res.status(201).json({
                message: "Invalid Credential",
                type: "error",
            });
        }
        res
            .cookie("auth", response[0].auth, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            .cookie("user", response[0].type_of_user, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            .status(200)
            .json({
                message: "Successfully Logged In",
                type: "success",
                type_of_user: response[0].type_of_user,
            });
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request",
            type: "error",
        });
    }
});
module.exports = router;