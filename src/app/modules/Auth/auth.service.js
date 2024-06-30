import bcrypt from "bcrypt";
import config from "../../config/index.js";
import { User } from "../User/user.model.js";
import { JwtHelpers } from "../../utils/jwtHelpers.js";
import { Admin } from "../Admin/admin.model.js";
import { sendEmail } from "../../utils/sendEmail.js";

const login = async (payload) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, isUserExist?.password);

  if (!isPasswordMatch) {
    throw new Error("Password not match");
  }
  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = JwtHelpers.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);

  const refreshToken = JwtHelpers.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);

  return { accessToken, refreshToken };
};

const refreshToken = async (token) => {
  const decoded = JwtHelpers.verifyToken(token, config.jwt_refresh_secret);
  if (!decoded) {
    throw new Error("Invalid token");
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isActive) {
    throw new Error("User is not active");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const accessToken = JwtHelpers.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in);
  return { accessToken };
};

const changePassword = async (user, payload) => {
  const userInfo = await User.findById(user.id);
  if (!userInfo) {
    throw new Error("User not found");
  }
  const { oldPassword, newPassword } = payload;

  const isPasswordMatch = await bcrypt.compare(oldPassword, userInfo.password);

  if (!isPasswordMatch) {
    throw new Error("Password not matched");
  }

  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

  await User.findByIdAndUpdate(user.id, { password: hashedPassword }, { new: true });
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

const forgetPassword = async (payload) => {
  const { email } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new Error("User not found");
  }
  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
  };

  const passwordResetToken = JwtHelpers.createToken(
    jwtPayload,
    config.password_reset_secret,
    config.password_reset_expires_in
  );
  const resetPasswordUiLink = `${config.client_url}/reset-password?id=${isUserExist._id}&token=${passwordResetToken}`;
  await sendEmail(
    isUserExist.email,
    "Reset Password",
    `
    <div>
    <h1> Hi ${isUserExist.userName}, </h1>
    <p>Please click the link below to reset your password</p>
    <a href=${resetPasswordUiLink}>
    <button>Reset Password</button>
    </a>
    </div>
    
    `
  );
};

const resetPassword = async (token, payload) => {
  const { id, newPassword } = payload;
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new Error("User not found");
  }
  const decoded = JwtHelpers.verifyToken(token, config.password_reset_secret);
  if (!decoded || decoded.id !== id) {
    throw new Error("Invalid token");
  }
  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
  await User.findByIdAndUpdate(id, { password: hashedPassword });
  let result;
  if (isUserExist.role === "admin") {
    result = await Admin.findOne({ user: id }).populate({
      path: "user",
      select: "-password",
    });
  } else {
    throw new Error("User not found");
  }

  return result;
};

export const AuthServices = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
