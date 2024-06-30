"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _AchievementService = require("./Achievement.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create Achievement
const createAchievement = (0, _catchAsync.default)(async (req, res) => {
  const result = await _AchievementService.AchievementServices.createAchievement(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Achievement created successfully",
    data: result
  });
});

// Get all Achievement
const getAllAchievement = (0, _catchAsync.default)(async (req, res) => {
  const result = await _AchievementService.AchievementServices.getAllAchievement(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All Achievement fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single Achievement
const getSingleAchievement = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _AchievementService.AchievementServices.getSingleAchievement(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Achievement fetched successfully",
    data: result
  });
});

// Update Achievement
const updateAchievement = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _AchievementService.AchievementServices.updateAchievement(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Achievement updated successfully",
    data: result
  });
});

// Delete Achievement
const deleteAchievement = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _AchievementService.AchievementServices.deleteAchievement(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Achievement deleted successfully",
    data: result
  });
});
const AchievementControllers = exports.AchievementControllers = {
  createAchievement,
  getAllAchievement,
  getSingleAchievement,
  updateAchievement,
  deleteAchievement
};