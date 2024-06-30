"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserServices = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _adminModel = require("../Admin/admin.model.js");
var _index = _interopRequireDefault(require("../../config/index.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _userModel = require("./user.model.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAdmin = async payload => {
  const {
    password,
    admin
  } = payload;
  const userRole = "admin";
  const isUserExist = await _userModel.User.findOne({
    email: admin.email
  });
  if (isUserExist) {
    throw new Error("User already exist");
  }
  const session = await _mongoose.default.startSession();
  const hashedPassword = await _bcrypt.default.hash(password, Number(_index.default.bcrypt_salt_rounds));
  try {
    await session.startTransaction();
    const newUser = await _userModel.User.create([{
      password: hashedPassword,
      userName: admin.name.split(" ").join("").toLowerCase() + Date.now(),
      email: admin.email,
      role: userRole
    }], {
      session
    });
    if (!newUser) {
      throw new Error("User creation failed");
    }
    console.log(newUser[0]);
    const newAdmin = await _adminModel.Admin.create([{
      ...admin,
      user: newUser[0]._id
    }], {
      session
    });
    if (!newAdmin) {
      throw new Error("Admin creation failed");
    }
    await session.commitTransaction();
    session.endSession();
    return newAdmin[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getMe = async user => {
  const userInfo = await _userModel.User.findById(user.id);
  if (!userInfo) {
    throw new Error("User not found");
  }
  let result;
  if (userInfo.role === "admin") {
    result = await _adminModel.Admin.findOne({
      user: user.id
    }).populate({
      path: "user",
      select: "-password"
    });
  } else if (userInfo.role === "customer") {
    result = await Customer.findOne({
      user: user.id
    }).populate({
      path: "user",
      select: "-password"
    });
  } else {
    throw new Error("User not found");
  }
  return result;
};
const UserServices = exports.UserServices = {
  createAdmin,
  getMe
};