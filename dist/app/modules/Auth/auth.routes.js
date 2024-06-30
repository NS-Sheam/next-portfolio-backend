"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("./auth.controller.js");
var _auth = _interopRequireDefault(require("../../middlewares/auth.js"));
var _userConst = require("../User/user.const.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/login", _authController.AuthControllers.login);
router.post("/refresh-token", _authController.AuthControllers.refreshToken);
router.post("/change-password", (0, _auth.default)(_userConst.USER_ROLE.ADMIN, _userConst.USER_ROLE.CUSTOMER), _authController.AuthControllers.changePassword);
router.post("/forget-password", _authController.AuthControllers.forgetPassword);
router.post("/reset-password", _authController.AuthControllers.resetPassword);
const AuthRoutes = exports.AuthRoutes = router;