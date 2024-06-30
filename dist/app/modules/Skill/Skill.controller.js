"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _SkillService = require("./Skill.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create Skill
const createSkill = (0, _catchAsync.default)(async (req, res) => {
  const result = await _SkillService.SkillServices.createSkill(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Skill created successfully",
    data: result
  });
});

// Get all Skill
const getAllSkill = (0, _catchAsync.default)(async (req, res) => {
  const result = await _SkillService.SkillServices.getAllSkill(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All Skill fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single Skill
const getSingleSkill = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _SkillService.SkillServices.getSingleSkill(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Skill fetched successfully",
    data: result
  });
});

// Update Skill
const updateSkill = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _SkillService.SkillServices.updateSkill(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Skill updated successfully",
    data: result
  });
});

// Delete Skill
const deleteSkill = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _SkillService.SkillServices.deleteSkill(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Skill deleted successfully",
    data: result
  });
});
const SkillControllers = exports.SkillControllers = {
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill
};