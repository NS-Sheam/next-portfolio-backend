"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../config/index.js"));
var _userModel = require("../modules/User/user.model.js");
var _catchAsync = _interopRequireDefault(require("../utils/catchAsync.js"));
var _jwtHelpers = require("../utils/jwtHelpers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const auth = (...roles) => {
  return (0, _catchAsync.default)(async (req, res, next) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new Error("You are not authorized");
    }
    let user;
    try {
      // verify token
      user = await _jwtHelpers.JwtHelpers.verifyToken(token, _index.default.jwt_access_secret);
    } catch (err) {
      throw new Error("You are not authorized");
    }
    if (roles.length && !roles.includes(user.role)) {
      throw new Error("You are not authorized");
    }
    const isUserExist = await _userModel.User.findById(user?.id);
    if (!isUserExist) {
      throw new Error("User not found");
    }
    if (!isUserExist?.isActive) {
      throw new Error("User is not active");
    }
    req.user = user;
    next();
  });
};
var _default = exports.default = auth;