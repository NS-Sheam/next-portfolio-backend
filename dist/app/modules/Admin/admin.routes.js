"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../../middlewares/auth.js"));
var _userConst = require("../User/user.const.js");
var _adminController = require("./admin.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get("/", (0, _auth.default)(_userConst.USER_ROLE.ADMIN), _adminController.AdminControllers.getAllAdmins);
router.get("/:id", (0, _auth.default)(_userConst.USER_ROLE.ADMIN), _adminController.AdminControllers.getAdminById);
router.patch("/", (0, _auth.default)(_userConst.USER_ROLE.ADMIN), _adminController.AdminControllers.updateAdmin);
router.patch("/delete/:id", (0, _auth.default)(_userConst.USER_ROLE.ADMIN, _userConst.USER_ROLE.CUSTOMER), _adminController.AdminControllers.softDeleteAdmin);
router.delete("/:id", (0, _auth.default)(_userConst.USER_ROLE.SUPER_ADMIN), _adminController.AdminControllers.hardDeleteAdmin);
const AdminRoutes = exports.AdminRoutes = router;