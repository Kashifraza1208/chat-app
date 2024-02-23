const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { getUsersForSidebar } = require("../controllers/userController");

router.route("/").get(isAuthenticatedUser, getUsersForSidebar);

module.exports = router;
