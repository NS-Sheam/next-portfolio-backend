"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AboutControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _AboutService = require("./About.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create About
const createAbout = (0, _catchAsync.default)(async (req, res) => {
  const result = await _AboutService.AboutServices.createAbout(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "About created successfully",
    data: result
  });
});

// Get all About
const getAllAbout = (0, _catchAsync.default)(async (req, res) => {
  const result = await _AboutService.AboutServices.getAllAbout(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All About fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single About
const getSingleAbout = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _AboutService.AboutServices.getSingleAbout(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "About fetched successfully",
    data: result
  });
});

// Update About
const updateAbout = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _AboutService.AboutServices.updateAbout(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "About updated successfully",
    data: result
  });
});

// Delete About
const deleteAbout = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _AboutService.AboutServices.deleteAbout(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "About deleted successfully",
    data: result
  });
});
const AboutControllers = exports.AboutControllers = {
  createAbout,
  getAllAbout,
  getSingleAbout,
  updateAbout,
  deleteAbout
};