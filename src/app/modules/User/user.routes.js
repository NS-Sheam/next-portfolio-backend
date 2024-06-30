import express from "express";
import { UserControllers } from "./user.controller.js";
import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "./user.const.js";

const router = express.Router();

router.post("/admin", UserControllers.createAdmin);
router.get("/me", auth(USER_ROLE.ADMIN), UserControllers.getMe);

export const UserRoutes = router;
