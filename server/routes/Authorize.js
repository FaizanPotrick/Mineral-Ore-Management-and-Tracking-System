const express = require("express");
const router = express.Router();
router.get("/api/type_of_user", async (req, res) => {
  if (req.session.type_of_user === req.cookies.type_of_user) {
    if (req.session._id === req.cookies._id) {
      return res.status(200).end();
    }
  }
  res.status(403).end();
});
router.get("/api/type_of_region", async (req, res) => {
  if (req.session.type_of_region === req.cookies.type_of_region) {
    return res.status(200).end();
  }
  res.status(403).end();
});
module.exports = router;
