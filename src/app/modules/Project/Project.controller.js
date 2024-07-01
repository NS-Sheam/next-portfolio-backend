import catchAsync from "../../utils/catchAsync.js";
import { ProjectServices } from "./Project.service.js";
import sendResponse from "../../utils/sendResponse.js";

// Create Project
const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProject(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

// Get all Project
const getAllProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProject(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Project fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Project
const getSingleProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.getSingleProject(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Project fetched successfully",
    data: result,
  });
});

// Update Project
const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProject(id, req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});
const updateProjectPosition = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProjectPosition(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

// Delete Project
const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProject(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  updateProjectPosition,
  deleteProject,
};
