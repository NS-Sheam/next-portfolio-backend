
import catchAsync from "../../utils/catchAsync.js";
import { 
  AboutServices
 } from "./About.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create About
const createAbout = catchAsync(async (req, res) => {
  const result = await 
  AboutServices.createAbout(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "About created successfully",
    data: result,
  });
});

// Get all About
const getAllAbout = catchAsync(async (req, res) => {
  const result = await 
  AboutServices.getAllAbout(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All About fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single About
const getSingleAbout = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  AboutServices.getSingleAbout(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "About fetched successfully",
    data: result,
  });
});

// Update About
const updateAbout = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  AboutServices.updateAbout(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "About updated successfully",
    data: result,
  });
});

// Delete About
const deleteAbout = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  AboutServices.deleteAbout(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "About deleted successfully",
    data: result,
  });
});

export const AboutControllers ={
  createAbout,
  getAllAbout,
  getSingleAbout,
  updateAbout,
  deleteAbout

}
