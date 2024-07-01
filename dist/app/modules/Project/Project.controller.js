"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _ProjectService = require("./Project.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create Project
const createProject = (0, _catchAsync.default)(async (req, res) => {
  const result = await _ProjectService.ProjectServices.createProject(req.file, req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Project created successfully",
    data: result
  });
});

// Get all Project
const getAllProject = (0, _catchAsync.default)(async (req, res) => {
  const result = await _ProjectService.ProjectServices.getAllProject(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All Project fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single Project
const getSingleProject = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _ProjectService.ProjectServices.getSingleProject(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Project fetched successfully",
    data: result
  });
});

// Update Project
const updateProject = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _ProjectService.ProjectServices.updateProject(id, req.file, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Project updated successfully",
    data: result
  });
});
const updateProjectPosition = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _ProjectService.ProjectServices.updateProjectPosition(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Project updated successfully",
    data: result
  });
});

// Delete Project
const deleteProject = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _ProjectService.ProjectServices.deleteProject(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Project deleted successfully",
    data: result
  });
});
const ProjectControllers = exports.ProjectControllers = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  updateProjectPosition,
  deleteProject
};