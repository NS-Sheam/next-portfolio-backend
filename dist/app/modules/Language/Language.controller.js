"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _LanguageService = require("./Language.service.js");
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Create Language
const createLanguage = (0, _catchAsync.default)(async (req, res) => {
  const result = await _LanguageService.LanguageServices.createLanguage(req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Language created successfully",
    data: result
  });
});

// Get all Language
const getAllLanguage = (0, _catchAsync.default)(async (req, res) => {
  const result = await _LanguageService.LanguageServices.getAllLanguage(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All Language fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});

// Get single Language
const getSingleLanguage = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _LanguageService.LanguageServices.getSingleLanguage(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Language fetched successfully",
    data: result
  });
});

// Update Language
const updateLanguage = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _LanguageService.LanguageServices.updateLanguage(id, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Language updated successfully",
    data: result
  });
});

// Delete Language
const deleteLanguage = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _LanguageService.LanguageServices.deleteLanguage(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Language deleted successfully",
    data: result
  });
});
const LanguageControllers = exports.LanguageControllers = {
  createLanguage,
  getAllLanguage,
  getSingleLanguage,
  updateLanguage,
  deleteLanguage
};