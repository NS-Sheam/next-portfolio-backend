"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminServices = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _QueryBuilder = _interopRequireDefault(require("../../helpers/QueryBuilder.js"));
var _userConst = require("../User/user.const.js");
var _userModel = require("../User/user.model.js");
var _adminConst = require("./admin.const.js");
var _adminModel = require("./admin.model.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getAllAdmins = async query => {
  const adminQuery = new _QueryBuilder.default(_adminModel.Admin.find().populate({
    path: "user",
    select: "-password"
  }), query).search(_adminConst.adminSearchableFields).filter().sort().fields().paginate().limit();
  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    data: result,
    meta
  };
};
const getAdminById = async id => {
  const result = await _adminModel.Admin.findById(id).populate({
    path: "user",
    select: "-password"
  });
  return result;
};
const updateAdmin = async (user, payload) => {
  const userInfo = await _userModel.User.findById(user?.id);
  if (!userInfo) {
    throw new Error("User not found");
  }
  const result = await _adminModel.Admin.findOneAndUpdate({
    user: user.id
  }, payload, {
    runValidators: true,
    new: true
  });
  return result;
};
const softDeleteAdmin = async (user, id) => {
  const isAdminExist = await _adminModel.Admin.findById(id);
  if (!isAdminExist) {
    throw new Error("Admin not found");
  }
  if (user.role !== _userConst.USER_ROLE.ADMIN || isAdminExist.user.toString() !== user.id.toString()) {
    throw new Error("You are unauthorized");
  }
  const session = await _mongoose.default.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await _adminModel.Admin.findByIdAndUpdate(isAdminExist._id, {
      isActive: false
    }, {
      new: true,
      session
    });
    if (!deletedAdmin) {
      throw new Error("Admin deletion failed");
    }
    const deletedUser = await _userModel.User.findByIdAndUpdate(isAdminExist.user, {
      isActive: false
    }, {
      new: true,
      session
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
const hardDeleteAdmin = async (user, id) => {
  const isAdminExist = await _adminModel.Admin.findById(id);
  if (!isAdminExist) {
    throw new Error("Admin not found");
  }
  if (user.role !== _userConst.USER_ROLE.ADMIN || isAdminExist.user.toString() !== user.id.toString()) {
    throw new Error("You are unauthorized");
  }
  const session = await _mongoose.default.startSession();
  try {
    await session.startTransaction();
    const deletedAdmin = await _adminModel.Admin.findByIdAndDelete(id, {
      new: true,
      session
    });
    if (!deletedAdmin) {
      throw new Error("Admin deletion failed");
    }
    const deletedUser = await _userModel.User.findByIdAndDelete(deletedAdmin.user, {
      new: true,
      session
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
const AdminServices = exports.AdminServices = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  softDeleteAdmin,
  hardDeleteAdmin
};