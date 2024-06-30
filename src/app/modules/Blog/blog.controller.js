import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { BlogServices } from "./blog.service.js";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlog(req.file, req.user, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlog(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All blogs fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getBlogById(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Blog fetched successfully",
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlog(id, req.file, req.body);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BlogServices.deleteBlog(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogsControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
