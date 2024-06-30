"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("./user.controller.js");
var _auth = _interopRequireDefault(require("../../middlewares/auth.js"));
var _userConst = require("./user.const.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/admin", _userController.UserControllers.createAdmin);
router.get("/me", (0, _auth.default)(_userConst.USER_ROLE.ADMIN), _userController.UserControllers.getMe);
const UserRoutes = exports.UserRoutes = router;