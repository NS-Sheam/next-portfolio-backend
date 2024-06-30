"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthControllers = void 0;
var _index = _interopRequireDefault(require("../../config/index.js"));
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
var _authService = require("./auth.service.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const login = (0, _catchAsync.default)(async (req, res) => {
  const result = await _authService.AuthServices.login(req.body);
  const {
    accessToken,
    refreshToken
  } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: _index.default.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Login success",
    data: {
      accessToken
    }
  });
});
const refreshToken = (0, _catchAsync.default)(async (req, res) => {
  const {
    refreshToken
  } = req.cookies;
  const result = await _authService.AuthServices.refreshToken(refreshToken);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Token refreshed",
    data: result
  });
});
const changePassword = (0, _catchAsync.default)(async (req, res) => {
  const result = await _authService.AuthServices.changePassword(req.user, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Password changed",
    data: result
  });
});
const forgetPassword = (0, _catchAsync.default)(async (req, res) => {
  const result = await _authService.AuthServices.forgetPassword(req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Password reset link sent to your email",
    data: result
  });
});
const resetPassword = (0, _catchAsync.default)(async (req, res) => {
  const token = req.headers.authorization || "";
  const result = await _authService.AuthServices.resetPassword(token, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Password reset successfully",
    data: result
  });
});
const AuthControllers = exports.AuthControllers = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword
};