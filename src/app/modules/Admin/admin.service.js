import mongoose from "mongoose";
import QueryBuilder from "../../helpers/QueryBuilder.js";
import { USER_ROLE } from "../User/user.const.js";
import { User } from "../User/user.model.js";
import { adminSearchableFields } from "./admin.const.js";
import { Admin } from "./admin.model.js";
import { sendFileToCloudinary } from "../../utils/sendFileToCloudinary.js";

const getAllAdmins = async (query) => {
  const adminQuery = new QueryBuilder(Admin.find().populate({ path: "user", select: "-password" }), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .limit();
  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return { data: result, meta };
};

const getAdminById = async (id) => {
  const result = await Admin.findById(id).populate({
    path: "user",
    select: "-password",
  });
  return result;
};

const updateAdmin = async (files, user, payload) => {
  const isAdminExist = await Admin.findOne({ user: user.id });
  if (!isAdminExist) {
    throw new Error("Admin not found");
  }

  if (files?.profileImage?.length) {
    const imageName = `${payload?.name}|profileImage|${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, files.profileImage[0].path);
    payload.personalInfoSchema.profileImage = secure_url;
  }
  if (files?.bannerImage?.length) {
    const imageName = `${payload?.name}|bannerImage|${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, files.bannerImage[0].path);
    payload.personalInfoSchema.bannerImage = secure_url;
  }
  if (files?.secondaryProfileImage?.length) {
    const imageName = `${payload?.name}|secondaryProfileImage|${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, files.secondaryProfileImage[0].path);
    payload.personalInfoSchema.secondaryProfileImage = secure_url;
  }
  if (files?.logo?.length) {
    const imageName = `${payload?.name}|logo|${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, files.logo[0].path);
    payload.personalInfoSchema.logo = secure_url;
  }
  if (files?.logoBW?.length) {
    const imageName = `${payload?.name}|logoBW|${Date.now()}`;
    const { secure_url } = await sendFileToCloudinary(imageName, files.logoBW[0].path);
    payload.personalInfoSchema.logoBW = secure_url;
  }

  const result = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const softDeleteAdmin = async (user, id) => {
  const isAdminExist = await Admin.findById(id);

  if (!isAdminExist) {
    throw new Error("Admin not found");
  }

  if (user.role !== USER_ROLE.ADMIN || isAdminExist.user.toString() !== user.id.toString()) {
    throw new Error("You are unauthorized");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(isAdminExist._id, { isActive: false }, { new: true, session });

    if (!deletedAdmin) {
      throw new Error("Admin deletion failed");
    }
    const deletedUser = await User.findByIdAndUpdate(isAdminExist.user, { isActive: false }, { new: true, session });
    if (!deletedUser) {
      throw new Error("User deletion failed");
    }
    await session.commitTransaction();
    session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const hardDeleteAdmin = async (user, id) => {
  const isAdminExist = await Admin.findById(id);

  if (!isAdminExist) {
    throw new Error("Admin not found");
  }

  if (user.role !== USER_ROLE.ADMIN || isAdminExist.user.toString() !== user.id.toString()) {
    throw new Error("You are unauthorized");
  }
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndDelete(id, {
      new: true,
      session,
    });
    if (!deletedAdmin) {
      throw new Error("Admin deletion failed");
    }
    const deletedUser = await User.findByIdAndDelete(deletedAdmin.user, {
      new: true,
      session,
    });
    if (!deletedUser) {
      throw new Error("User deletion failed");
    }
    await session.commitTransaction();
    session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AdminServices = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
  hardDeleteAdmin,
};
