import catchAsync from "../../utils/catchAsync.js";
import { HobbiesAndInterestServices } from "./HobbiesAndInterest.service.js";
import sendResponse from "../../utils/sendResponse.js";

// Create HobbiesAndInterest
const createHobbiesAndInterest = catchAsync(async (req, res) => {
  const result = await HobbiesAndInterestServices.createHobbiesAndInterest(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "HobbiesAndInterest created successfully",
    data: result,
  });
});

// Get all HobbiesAndInterest
const getAllHobbiesAndInterest = catchAsync(async (req, res) => {
  const result = await HobbiesAndInterestServices.getAllHobbiesAndInterest(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All HobbiesAndInterest fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single HobbiesAndInterest
const getSingleHobbiesAndInterest = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HobbiesAndInterestServices.getSingleHobbiesAndInterest(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest fetched successfully",
    data: result,
  });
});

// Update HobbiesAndInterest
const updateHobbiesAndInterest = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HobbiesAndInterestServices.updateHobbiesAndInterest(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest updated successfully",
    data: result,
  });
});

const updateHobbiesAndInterestPosition = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HobbiesAndInterestServices.updateHobbiesAndInterestPosition(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest updated successfully",
    data: result,
  });
});

// Delete HobbiesAndInterest
const deleteHobbiesAndInterest = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HobbiesAndInterestServices.deleteHobbiesAndInterest(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "HobbiesAndInterest deleted successfully",
    data: result,
  });
});

export const HobbiesAndInterestControllers = {
  createHobbiesAndInterest,
  getAllHobbiesAndInterest,
  getSingleHobbiesAndInterest,
  updateHobbiesAndInterest,
  updateHobbiesAndInterestPosition,
  deleteHobbiesAndInterest,
};
