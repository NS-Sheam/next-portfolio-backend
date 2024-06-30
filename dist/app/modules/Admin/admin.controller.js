"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
var _adminService = require("./admin.service.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getAllAdmins = (0, _catchAsync.default)(async (req, res) => {
  const result = await _adminService.AdminServices.getAllAdmins(req?.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All admin fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
const getAdminById = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _adminService.AdminServices.getAdminById(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Admin fetched successfully",
    data: result
  });
});
const updateAdmin = (0, _catchAsync.default)(async (req, res) => {
  const result = await _adminService.AdminServices.updateAdmin(req.user, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Admin updated successfully",
    data: result
  });
});
const softDeleteAdmin = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _adminService.AdminServices.softDeleteAdmin(req.user, id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Admin soft deleted successfully",
    data: result
  });
});
const hardDeleteAdmin = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _adminService.AdminServices.hardDeleteAdmin(req.user, id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Admin deleted successfully",
    data: result
  });
});
const AdminControllers = exports.AdminControllers = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
  hardDeleteAdmin
};