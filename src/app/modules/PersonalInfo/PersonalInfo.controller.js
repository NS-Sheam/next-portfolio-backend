import catchAsync from "../../utils/catchAsync.js";
import { PersonalInfoServices } from "./PersonalInfo.service.js";
import sendResponse from "../../utils/sendResponse.js";

// Create PersonalInfo
const createPersonalInfo = catchAsync(async (req, res) => {
  const result = await PersonalInfoServices.createPersonalInfo(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "PersonalInfo created successfully",
    data: result,
  });
});

// Get all PersonalInfo
const getAllPersonalInfo = catchAsync(async (req, res) => {
  const result = await PersonalInfoServices.getAllPersonalInfo(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All PersonalInfo fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single PersonalInfo
const getSinglePersonalInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PersonalInfoServices.getSinglePersonalInfo(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "PersonalInfo fetched successfully",
    data: result,
  });
});

// Update PersonalInfo
const updatePersonalInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PersonalInfoServices.updatePersonalInfo(id, req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "PersonalInfo updated successfully",
    data: result,
  });
});

// Delete PersonalInfo
const deletePersonalInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PersonalInfoServices.deletePersonalInfo(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "PersonalInfo deleted successfully",
    data: result,
  });
});

export const PersonalInfoControllers = {
  createPersonalInfo,
  getAllPersonalInfo,
  getSinglePersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
};
