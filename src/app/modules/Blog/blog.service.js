import QueryBuilder from "../../helpers/QueryBuilder.js";
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary.js";

import { Admin } from "../Admin/admin.model.js";
import { blogSearchableFields } from "./blog.const.js";
import { Blog } from "./blog.model.js";

const createBlog = async (file, user, payload) => {
  const authorInfo = await Admin.findOne({ user: user.id });
  payload.author = authorInfo.id;
  if (file) {
    const imageName = `${payload?.title}-${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, file.path);
    payload.image = secure_url;
  }
  const result = await Blog.create(payload);

  return result;
};

const getAllBlog = async (query) => {
  const resultQuery = new QueryBuilder(Blog.find().populate("author"), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await resultQuery.modelQuery;
  const meta = await resultQuery.countTotal();
  return { data: result, meta };
};
const getBlogById = async (id) => {
  const result = await Blog.findById(id);
  return result;
};
const updateBlog = async (id, file, payload) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new Error("Blog not found");
  }
  if (file) {
    const imageName = `${payload?.title || isBlogExist?.title}-${Date.now()}`;
    const imagePath = file.path;
    const { secure_url } = await sendFileToCloudinary(imageName, imagePath);
    payload.image = secure_url;
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBlog = async (id) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
