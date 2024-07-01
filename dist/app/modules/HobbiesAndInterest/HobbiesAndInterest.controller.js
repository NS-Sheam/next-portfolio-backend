"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HobbiesAndInterestControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _HobbiesAndInterestService = require("./HobbiesAndInterest.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create HobbiesAndInterest
const createHobbiesAndInterest = (0, _catchAsync.default)(async (req, res) => {
  const result = await _HobbiesAndInterestService.HobbiesAndInterestServices.createHobbiesAndInterest(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "HobbiesAndInterest created successfully",
    data: result
  });
});

// Get all HobbiesAndInterest
const getAllHobbiesAndInterest = (0, _catchAsync.default)(async (req, res) => {
  const result = await _HobbiesAndInterestService.HobbiesAndInterestServices.getAllHobbiesAndInterest(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All HobbiesAndInterest fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single HobbiesAndInterest
const getSingleHobbiesAndInterest = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _HobbiesAndInterestService.HobbiesAndInterestServices.getSingleHobbiesAndInterest(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest fetched successfully",
    data: result
  });
});

// Update HobbiesAndInterest
const updateHobbiesAndInterest = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _HobbiesAndInterestService.HobbiesAndInterestServices.updateHobbiesAndInterest(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest updated successfully",
    data: result
  });
});
const updateHobbiesAndInterestPosition = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _HobbiesAndInterestService.HobbiesAndInterestServices.updateHobbiesAndInterestPosition(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest updated successfully",
    data: result
  });
});

// Delete HobbiesAndInterest
const deleteHobbiesAndInterest = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _HobbiesAndInterestService.HobbiesAndInterestServices.deleteHobbiesAndInterest(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest deleted successfully",
    data: result
  });
});
const HobbiesAndInterestControllers = exports.HobbiesAndInterestControllers = {
  createHobbiesAndInterest,
  getAllHobbiesAndInterest,
  getSingleHobbiesAndInterest,
  updateHobbiesAndInterest,
  updateHobbiesAndInterestPosition,
  deleteHobbiesAndInterest
};