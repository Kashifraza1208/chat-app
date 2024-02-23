const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

//sending message so only authenticated user can send the message
router.route("/send/:id").post(isAuthenticatedUser, sendMessage);
router.route("/:id").get(isAuthenticatedUser, getMessages); //getMessages between two user

module.exports = router;
