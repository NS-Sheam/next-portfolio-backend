"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HobbyControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _HobbyService = require("./Hobby.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create Hobby
const createHobby = (0, _catchAsync.default)(async (req, res) => {
  const result = await _HobbyService.HobbyServices.createHobby(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Hobby created successfully",
    data: result
  });
});

// Get all Hobby
const getAllHobby = (0, _catchAsync.default)(async (req, res) => {
  const result = await _HobbyService.HobbyServices.getAllHobby(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All Hobby fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single Hobby
const getSingleHobby = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _HobbyService.HobbyServices.getSingleHobby(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Hobby fetched successfully",
    data: result
  });
});

// Update Hobby
const updateHobby = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _HobbyService.HobbyServices.updateHobby(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Hobby updated successfully",
    data: result
  });
});

// Delete Hobby
const deleteHobby = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _HobbyService.HobbyServices.deleteHobby(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Hobby deleted successfully",
    data: result
  });
});
const HobbyControllers = exports.HobbyControllers = {
  createHobby,
  getAllHobby,
  getSingleHobby,
  updateHobby,
  deleteHobby
};