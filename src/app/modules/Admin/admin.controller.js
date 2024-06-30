import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { AdminServices } from "./admin.service.js";

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdmins(req?.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All admin fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getAdminById(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdmin(req.user, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const softDeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.softDeleteAdmin(req.user, id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Admin soft deleted successfully",
    data: result,
  });
});
const hardDeleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.hardDeleteAdmin(req.user, id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
  hardDeleteAdmin,
};
