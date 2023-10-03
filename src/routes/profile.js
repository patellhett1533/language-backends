const express = require("express");
const router = express.Router();
const { getProfile } = require("../controller/profile");
const { requireLogin } = require("../middleware/auth");

router.get("/profile", requireLogin, getProfile);

module.exports = router;
