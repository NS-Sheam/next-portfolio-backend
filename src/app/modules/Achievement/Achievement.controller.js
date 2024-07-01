import catchAsync from "../../utils/catchAsync.js";
import { AchievementServices } from "./Achievement.service.js";
import sendResponse from "../../utils/sendResponse.js";

// Create Achievement
const createAchievement = catchAsync(async (req, res) => {
  const result = await AchievementServices.createAchievement(req.file, req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Achievement created successfully",
    data: result,
  });
});

// Get all Achievement
const getAllAchievement = catchAsync(async (req, res) => {
  const result = await AchievementServices.getAllAchievement(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Achievement fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Achievement
const getSingleAchievement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AchievementServices.getSingleAchievement(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Achievement fetched successfully",
    data: result,
  });
});

// Update Achievement
const updateAchievement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AchievementServices.updateAchievement(id, req.file, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Achievement updated successfully",
    data: result,
  });
});
const updateAchievementPosition = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AchievementServices.updateAchievementPosition(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Achievement updated successfully",
    data: result,
  });
});

// Delete Achievement
const deleteAchievement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AchievementServices.deleteAchievement(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Achievement deleted successfully",
    data: result,
  });
});

export const AchievementControllers = {
  createAchievement,
  getAllAchievement,
  getSingleAchievement,
  updateAchievement,
  updateAchievementPosition,
  deleteAchievement,
};
