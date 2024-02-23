const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const validator = require("validator");
const bcryptjs = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcryptjs.compare(enterdPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
