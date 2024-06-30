import config from "../../config/index.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AuthServices } from "./auth.service.js";

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  const { accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Login success",
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Token refreshed",
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Password changed",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Password reset link sent to your email",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization || "";

  const result = await AuthServices.resetPassword(token, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

export const AuthControllers = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
