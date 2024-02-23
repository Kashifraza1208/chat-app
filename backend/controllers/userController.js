const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

// I will get user's name and profile of user
exports.getUsersForSidebar = catchAsyncError(async (req, res, next) => {
  const loggedInUserId = req.user._id; //authenticated user
  const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
    "-password"
  ); //it will give all user except loggedin user . I cann remove this conditon to send message itself
  res.status(200).json(allUsers);
});
