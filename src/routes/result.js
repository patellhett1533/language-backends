const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middleware/auth");
const { setResult, getResult } = require("../controller/result");

router.post("/result/:id", requireLogin, setResult);

router.get("/result/:id", requireLogin, getResult);

module.exports = router;
