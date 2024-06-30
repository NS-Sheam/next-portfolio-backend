"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _mongoose = require("mongoose");
var _userConst = require("./user.const.js");
const userSchema = new _mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [_userConst.USER_ROLE.ADMIN],
    default: "admin"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});
const User = exports.User = (0, _mongoose.model)("User", userSchema);