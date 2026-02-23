const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const accountController = require("../controllers/account.controller");
const router = express.Router();

//routes

router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccount,
);

module.exports = router;
