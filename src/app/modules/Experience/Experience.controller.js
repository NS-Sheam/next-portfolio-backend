
import catchAsync from "../../utils/catchAsync.js";
import { 
  ExperienceServices
 } from "./Experience.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Experience
const createExperience = catchAsync(async (req, res) => {
  const result = await 
  ExperienceServices.createExperience(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

// Get all Experience
const getAllExperience = catchAsync(async (req, res) => {
  const result = await 
  ExperienceServices.getAllExperience(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Experience fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Experience
const getSingleExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ExperienceServices.getSingleExperience(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Experience fetched successfully",
    data: result,
  });
});

// Update Experience
const updateExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ExperienceServices.updateExperience(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

// Delete Experience
const deleteExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  ExperienceServices.deleteExperience(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Experience deleted successfully",
    data: result,
  });
});

export const ExperienceControllers ={
  createExperience,
  getAllExperience,
  getSingleExperience,
  updateExperience,
  deleteExperience

}
