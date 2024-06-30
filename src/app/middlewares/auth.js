import config from "../config/index.js";
import { User } from "../modules/User/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import { JwtHelpers } from "../utils/jwtHelpers.js";

const auth = (...roles) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new Error("You are not authorized");
    }

    let user;
    try {
      // verify token
      user = await JwtHelpers.verifyToken(token, config.jwt_access_secret);
    } catch (err) {
      throw new Error("You are not authorized");
    }
    if (roles.length && !roles.includes(user.role)) {
      throw new Error("You are not authorized");
    }

    const isUserExist = await User.findById(user?.id);

    if (!isUserExist) {
      throw new Error("User not found");
    }
    if (!isUserExist?.isActive) {
      throw new Error("User is not active");
    }
    req.user = user;

    next();
  });
};

export default auth;
