import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserServices } from "./user.service.js";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdmin(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMe(req.user);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  getMe,
};
