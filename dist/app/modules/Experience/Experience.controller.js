"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExperienceControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _ExperienceService = require("./Experience.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create Experience
const createExperience = (0, _catchAsync.default)(async (req, res) => {
  const result = await _ExperienceService.ExperienceServices.createExperience(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Experience created successfully",
    data: result
  });
});

// Get all Experience
const getAllExperience = (0, _catchAsync.default)(async (req, res) => {
  const result = await _ExperienceService.ExperienceServices.getAllExperience(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All Experience fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single Experience
const getSingleExperience = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _ExperienceService.ExperienceServices.getSingleExperience(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Experience fetched successfully",
    data: result
  });
});

// Update Experience
const updateExperience = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _ExperienceService.ExperienceServices.updateExperience(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Experience updated successfully",
    data: result
  });
});

// Delete Experience
const deleteExperience = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _ExperienceService.ExperienceServices.deleteExperience(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Experience deleted successfully",
    data: result
  });
});
const ExperienceControllers = exports.ExperienceControllers = {
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience
};