const express = require("express");
const { signup, login } = require("../controller/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateLoginRequest,
} = require("../validation/auth");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

router.post("/login", validateLoginRequest, isRequestValidated, login);

module.exports = router;
