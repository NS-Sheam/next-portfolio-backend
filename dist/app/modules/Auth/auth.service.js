"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthServices = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _index = _interopRequireDefault(require("../../config/index.js"));
var _userModel = require("../User/user.model.js");
var _jwtHelpers = require("../../utils/jwtHelpers.js");
var _adminModel = require("../Admin/admin.model.js");
var _sendEmail = require("../../utils/sendEmail.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const login = async payload => {
  const {
    email,
    password
  } = payload;
  const isUserExist = await _userModel.User.findOne({
    email
  });
  if (!isUserExist) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await _bcrypt.default.compare(password, isUserExist?.password);
  if (!isPasswordMatch) {
    throw new Error("Password not match");
  }
  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role
  };
  const accessToken = _jwtHelpers.JwtHelpers.createToken(jwtPayload, _index.default.jwt_access_secret, _index.default.jwt_access_expires_in);
  const refreshToken = _jwtHelpers.JwtHelpers.createToken(jwtPayload, _index.default.jwt_refresh_secret, _index.default.jwt_refresh_expires_in);
  return {
    accessToken,
    refreshToken
  };
};
const refreshToken = async token => {
  const decoded = _jwtHelpers.JwtHelpers.verifyToken(token, _index.default.jwt_refresh_secret);
  if (!decoded) {
    throw new Error("Invalid token");
  }
  const user = await _userModel.User.findById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.isActive) {
    throw new Error("User is not active");
  }
  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  const accessToken = _jwtHelpers.JwtHelpers.createToken(jwtPayload, _index.default.jwt_access_secret, _index.default.jwt_access_expires_in);
  return {
    accessToken
  };
};
const changePassword = async (user, payload) => {
  const userInfo = await _userModel.User.findById(user.id);
  if (!userInfo) {
    throw new Error("User not found");
  }
  const {
    oldPassword,
    newPassword
  } = payload;
  const isPasswordMatch = await _bcrypt.default.compare(oldPassword, userInfo.password);
  if (!isPasswordMatch) {
    throw new Error("Password not matched");
  }
  const hashedPassword = await _bcrypt.default.hash(newPassword, Number(_index.default.bcrypt_salt_rounds));
  await _userModel.User.findByIdAndUpdate(user.id, {
    password: hashedPassword
  }, {
    new: true
  });
  let result;
  if (userInfo.role === "admin") {
    result = await _adminModel.Admin.findOne({
      user: user.id
    }).populate({
      path: "user",
      select: "-password"
    });
  } else {
    throw new Error("User not found");
  }
  return result;
};
const forgetPassword = async payload => {
  const {
    email
  } = payload;
  const isUserExist = await _userModel.User.findOne({
    email
  });
  if (!isUserExist) {
    throw new Error("User not found");
  }
  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email
  };
  const passwordResetToken = _jwtHelpers.JwtHelpers.createToken(jwtPayload, _index.default.password_reset_secret, _index.default.password_reset_expires_in);
  const resetPasswordUiLink = `${_index.default.client_url}/reset-password?id=${isUserExist._id}&token=${passwordResetToken}`;
  await (0, _sendEmail.sendEmail)(isUserExist.email, "Reset Password", `
    <div>
    <h1> Hi ${isUserExist.userName}, </h1>
    <p>Please click the link below to reset your password</p>
    <a href=${resetPasswordUiLink}>
    <button>Reset Password</button>
    </a>
    </div>
    
    `);
};
const resetPassword = async (token, payload) => {
  const {
    id,
    newPassword
  } = payload;
  const isUserExist = await _userModel.User.findById(id);
  if (!isUserExist) {
    throw new Error("User not found");
  }
  const decoded = _jwtHelpers.JwtHelpers.verifyToken(token, _index.default.password_reset_secret);
  if (!decoded || decoded.id !== id) {
    throw new Error("Invalid token");
  }
  const hashedPassword = await _bcrypt.default.hash(newPassword, Number(_index.default.bcrypt_salt_rounds));
  await _userModel.User.findByIdAndUpdate(id, {
    password: hashedPassword
  });
  let result;
  if (isUserExist.role === "admin") {
    result = await _adminModel.Admin.findOne({
      user: id
    }).populate({
      path: "user",
      select: "-password"
    });
  } else {
    throw new Error("User not found");
  }
  return result;
};
const AuthServices = exports.AuthServices = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword
};