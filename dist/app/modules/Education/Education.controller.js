"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EducationControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _EducationService = require("./Education.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create Education
const createEducation = (0, _catchAsync.default)(async (req, res) => {
  const result = await _EducationService.EducationServices.createEducation(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Education created successfully",
    data: result
  });
});

// Get all Education
const getAllEducation = (0, _catchAsync.default)(async (req, res) => {
  const result = await _EducationService.EducationServices.getAllEducation(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All Education fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single Education
const getSingleEducation = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _EducationService.EducationServices.getSingleEducation(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Education fetched successfully",
    data: result
  });
});

// Update Education
const updateEducation = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _EducationService.EducationServices.updateEducation(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Education updated successfully",
    data: result
  });
});
const updateEducationPosition = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _EducationService.EducationServices.updateEducationPosition(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Education updated successfully",
    data: result
  });
});

// Delete Education
const deleteEducation = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _EducationService.EducationServices.deleteEducation(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Education deleted successfully",
    data: result
  });
});
const EducationControllers = exports.EducationControllers = {
  createEducation,
  getAllEducation,
  getSingleEducation,
  updateEducation,
  updateEducationPosition,
  deleteEducation
};