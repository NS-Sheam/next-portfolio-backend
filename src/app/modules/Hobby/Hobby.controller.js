
import catchAsync from "../../utils/catchAsync.js";
import { 
  HobbyServices
 } from "./Hobby.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Hobby
const createHobby = catchAsync(async (req, res) => {
  const result = await 
  HobbyServices.createHobby(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Hobby created successfully",
    data: result,
  });
});

// Get all Hobby
const getAllHobby = catchAsync(async (req, res) => {
  const result = await 
  HobbyServices.getAllHobby(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Hobby fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Hobby
const getSingleHobby = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  HobbyServices.getSingleHobby(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Hobby fetched successfully",
    data: result,
  });
});

// Update Hobby
const updateHobby = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  HobbyServices.updateHobby(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Hobby updated successfully",
    data: result,
  });
});

// Delete Hobby
const deleteHobby = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  HobbyServices.deleteHobby(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Hobby deleted successfully",
    data: result,
  });
});

export const HobbyControllers ={
  createHobby,
  getAllHobby,
  getSingleHobby,
  updateHobby,
  deleteHobby

}
