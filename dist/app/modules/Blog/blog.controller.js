"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlogsControllers = void 0;
var _catchAsync = _interopRequireDefault(require("../../utils/catchAsync.js"));
var _sendResponse = _interopRequireDefault(require("../../utils/sendResponse.js"));
var _blogService = require("./blog.service.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createBlog = (0, _catchAsync.default)(async (req, res) => {
  const result = await _blogService.BlogServices.createBlog(req.file, req.user, req.body);
  (0, _sendResponse.default)(res, {
    status: 201,
    success: true,
    message: "Blog created successfully",
    data: result
  });
});
const getAllBlogs = (0, _catchAsync.default)(async (req, res) => {
  const result = await _blogService.BlogServices.getAllBlog(req.query);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "All blogs fetched successfully",
    meta: result?.meta,
    data: result?.data
  });
});
const getBlogById = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _blogService.BlogServices.getBlogById(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Blog fetched successfully",
    data: result
  });
});
const updateBlog = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _blogService.BlogServices.updateBlog(id, req.file, req.body);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Blog updated successfully",
    data: result
  });
});
const deleteBlog = (0, _catchAsync.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const result = await _blogService.BlogServices.deleteBlog(id);
  (0, _sendResponse.default)(res, {
    status: 200,
    success: true,
    message: "Blog deleted successfully",
    data: result
  });
});
const BlogsControllers = exports.BlogsControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};