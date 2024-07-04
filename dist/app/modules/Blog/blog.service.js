"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.BlogServices = void 0;
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
var _sendFileToCloudinary = require("../../utils/sendFileToCloudinary.js");
var _adminModel = require("../Admin/admin.model.js");
var _blogConst = require("./blog.const.js");
var _blogModel = require("./blog.model.js");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
const createBlog = async (file, user, payload) => {
  const authorInfo = await _adminModel.Admin.findOne({
    user: user.id,
  });
  payload.author = authorInfo.id;
  if (file) {
    const imageName = `${payload?.title}-${Date.now()}`;
    const { secure_url } = await (0, _sendFileToCloudinary.sendFileToCloudinary)(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await _blogModel.Blog.create(payload);
  return result;
};
const getAllBlog = async (query) => {
  const resultQuery = new _QueryBuilder.default(_blogModel.Blog.find().populate("author"), query)
    .search(_blogConst.blogSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return {
    data: result,
    meta,
  };
};
const getBlogById = async (id) => {
  const result = await _blogModel.Blog.findById(id);
  return result;
};
const updateBlog = async (id, file, payload) => {
  const isBlogExist = await _blogModel.Blog.findById(id);
  if (!isBlogExist) {
    throw new Error("Blog not found");
  }
  if (file) {
    const imageName = `${payload?.title || isBlogExist?.title}-${Date.now()}`;
    const imagePath = file.path;
    const { secure_url } = await (0, _sendFileToCloudinary.sendFileToCloudinary)(imageName, imagePath);
    payload.image = secure_url;
  }
  const result = await _blogModel.Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteBlog = async (id) => {
  const result = await _blogModel.Blog.findByIdAndDelete(id);
  return result;
};
const BlogServices = (exports.BlogServices = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
});
