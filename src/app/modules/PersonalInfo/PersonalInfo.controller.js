
import catchAsync from "../../utils/catchAsync.js";
import { 
  PersonalInfoServices
 } from "./personalInfo.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create personalInfo
const createPersonalInfo = catchAsync(async (req, res) => {
  const result = await 
  PersonalInfoServices.createPersonalInfo(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "PersonalInfo created successfully",
    data: result,
  });
});

// Get all personalInfo
const getAllPersonalInfo = catchAsync(async (req, res) => {
  const result = await 
  PersonalInfoServices.getAllPersonalInfo(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All PersonalInfo fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single personalInfo
const getSinglePersonalInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  PersonalInfoServices.getSinglePersonalInfo(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "PersonalInfo fetched successfully",
    data: result,
  });
});

// Update personalInfo
const updatePersonalInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  PersonalInfoServices.updatePersonalInfo(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "PersonalInfo updated successfully",
    data: result,
  });
});

// Delete personalInfo
const deletePersonalInfo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  PersonalInfoServices.deletePersonalInfo(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "PersonalInfo deleted successfully",
    data: result,
  });
});

export const PersonalInfoControllers ={
  createPersonalInfo,
  getAllPersonalInfo,
  getSinglePersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo

}
