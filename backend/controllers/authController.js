const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");

exports.singup = catchAsyncError(async (req, res, next) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password don't match", 400));
  }

  const user = await User.findOne({ username });
  if (user) {
    return next(new ErrorHandler("Username already exists!", 400));
  }

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = await User.create({
    fullName,
    username,
    password,
    gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });

  sendToken(newUser, 201, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please Enter UserName & Password", 400));
  }

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid UserName or Password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Username or Password", 401));
  }

  sendToken(user, 200, res);
});

exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "Logged Out.",
  });
});
