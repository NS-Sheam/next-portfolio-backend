import mongoose from "mongoose";
import { Admin } from "../Admin/admin.model.js";
import config from "../../config/index.js";
import bcrypt from "bcrypt";
import { User } from "./user.model.js";

const createAdmin = async (payload) => {
  const { password, admin } = payload;
  const userRole = "admin";
  const isUserExist = await User.findOne({ email: admin.email });
  if (isUserExist) {
    throw new Error("User already exist");
  }
  const session = await mongoose.startSession();
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
  try {
    await session.startTransaction();

    const newUser = await User.create(
      [
        {
          password: hashedPassword,
          userName: admin.name.split(" ").join("").toLowerCase() + Date.now(),
          email: admin.email,
          role: userRole,
        },
      ],
      { session }
    );
    if (!newUser) {
      throw new Error("User creation failed");
    }
    console.log(newUser[0]);

    const newAdmin = await Admin.create(
      [
        {
          ...admin,
          user: newUser[0]._id,
        },
      ],
      { session }
    );
    if (!newAdmin) {
      throw new Error("Admin creation failed");
    }
    await session.commitTransaction();
    session.endSession();
    return newAdmin[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMe = async (user) => {
  const userInfo = await User.findById(user.id);
  if (!userInfo) {
    throw new Error("User not found");
  }
  let result;
  if (userInfo.role === "admin") {
    result = await Admin.findOne({ user: user.id }).populate({
      path: "user",
      select: "-password",
    });
  } else {
    throw new Error("User not found");
  }
  return result;
};
export const UserServices = {
  createAdmin,
  getMe,
};
