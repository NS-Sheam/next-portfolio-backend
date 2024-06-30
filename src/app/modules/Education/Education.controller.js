
import catchAsync from "../../utils/catchAsync.js";
import { 
  EducationServices
 } from "./Education.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Education
const createEducation = catchAsync(async (req, res) => {
  const result = await 
  EducationServices.createEducation(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Education created successfully",
    data: result,
  });
});

// Get all Education
const getAllEducation = catchAsync(async (req, res) => {
  const result = await 
  EducationServices.getAllEducation(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Education fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Education
const getSingleEducation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  EducationServices.getSingleEducation(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Education fetched successfully",
    data: result,
  });
});

// Update Education
const updateEducation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  EducationServices.updateEducation(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Education updated successfully",
    data: result,
  });
});

// Delete Education
const deleteEducation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  EducationServices.deleteEducation(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Education deleted successfully",
    data: result,
  });
});

export const EducationControllers ={
  createEducation,
  getAllEducation,
  getSingleEducation,
  updateEducation,
  deleteEducation

}
