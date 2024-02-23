const express = require("express");
const { login, singup, logOut } = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(singup);
router.route("/login").post(login);
router.route("/logout").get(logOut);

module.exports = router;
