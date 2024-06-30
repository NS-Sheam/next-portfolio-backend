"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin = void 0;
var _mongoose = require("mongoose");
const adminSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  contactNo: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});
const Admin = exports.Admin = (0, _mongoose.model)("Admin", adminSchema);