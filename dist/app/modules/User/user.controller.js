"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
var _userService = require("./user.service.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAdmin = (0, _catchAsync.default)(async (req, res) => {
  const result = await _userService.UserServices.createAdmin(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Admin created successfully",
    data: result
  });
});
const getMe = (0, _catchAsync.default)(async (req, res) => {
  const result = await _userService.UserServices.getMe(req.user);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "User fetched successfully",
    data: result
  });
});
const UserControllers = exports.UserControllers = {
  createAdmin,
  getMe
};