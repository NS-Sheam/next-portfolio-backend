"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalInfoControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _PersonalInfoService = require("./PersonalInfo.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create PersonalInfo
const createPersonalInfo = (0, _catchAsync.default)(async (req, res) => {
  const result = await _PersonalInfoService.PersonalInfoServices.createPersonalInfo(req.file, req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "PersonalInfo created successfully",
    data: result
  });
});

// Get all PersonalInfo
const getAllPersonalInfo = (0, _catchAsync.default)(async (req, res) => {
  const result = await _PersonalInfoService.PersonalInfoServices.getAllPersonalInfo(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All PersonalInfo fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single PersonalInfo
const getSinglePersonalInfo = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _PersonalInfoService.PersonalInfoServices.getSinglePersonalInfo(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "PersonalInfo fetched successfully",
    data: result
  });
});

// Update PersonalInfo
const updatePersonalInfo = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _PersonalInfoService.PersonalInfoServices.updatePersonalInfo(id, req.file, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "PersonalInfo updated successfully",
    data: result
  });
});

// Delete PersonalInfo
const deletePersonalInfo = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _PersonalInfoService.PersonalInfoServices.deletePersonalInfo(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "PersonalInfo deleted successfully",
    data: result
  });
});
const PersonalInfoControllers = exports.PersonalInfoControllers = {
  createPersonalInfo,
  getAllPersonalInfo,
  getSinglePersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo
};