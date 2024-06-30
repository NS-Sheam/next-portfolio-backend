
import catchAsync from "../../utils/catchAsync.js";
import { 
  SkillServices
 } from "./Skill.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Skill
const createSkill = catchAsync(async (req, res) => {
  const result = await 
  SkillServices.createSkill(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Skill created successfully",
    data: result,
  });
});

// Get all Skill
const getAllSkill = catchAsync(async (req, res) => {
  const result = await 
  SkillServices.getAllSkill(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Skill fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Skill
const getSingleSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  SkillServices.getSingleSkill(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Skill fetched successfully",
    data: result,
  });
});

// Update Skill
const updateSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  SkillServices.updateSkill(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Skill updated successfully",
    data: result,
  });
});

// Delete Skill
const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  SkillServices.deleteSkill(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Skill deleted successfully",
    data: result,
  });
});

export const SkillControllers ={
  createSkill,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill

}
