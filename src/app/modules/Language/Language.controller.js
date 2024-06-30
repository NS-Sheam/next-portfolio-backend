
import catchAsync from "../../utils/catchAsync.js";
import { 
  LanguageServices
 } from "./Language.service.js";
import sendResponse from "../../utils/sendResponse.js";


// Create Language
const createLanguage = catchAsync(async (req, res) => {
  const result = await 
  LanguageServices.createLanguage(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Language created successfully",
    data: result,
  });
});

// Get all Language
const getAllLanguage = catchAsync(async (req, res) => {
  const result = await 
  LanguageServices.getAllLanguage(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All Language fetched successfully",
    meta: result?.meta,
    data: result?.data,
  });
});

// Get single Language
const getSingleLanguage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  LanguageServices.getSingleLanguage(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Language fetched successfully",
    data: result,
  });
});

// Update Language
const updateLanguage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  LanguageServices.updateLanguage(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Language updated successfully",
    data: result,
  });
});

// Delete Language
const deleteLanguage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await 
  LanguageServices.deleteLanguage(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Language deleted successfully",
    data: result,
  });
});

export const LanguageControllers ={
  createLanguage,
  getAllLanguage,
  getSingleLanguage,
  updateLanguage,
  deleteLanguage

}
