import express from "express";
import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "../User/user.const.js";
import { AdminControllers } from "./admin.controller.js";

const router = express.Router();

router.get("/", auth(USER_ROLE.ADMIN), AdminControllers.getAllAdmins);
router.get("/:id", auth(USER_ROLE.ADMIN), AdminControllers.getAdminById);
router.patch("/", auth(USER_ROLE.ADMIN), AdminControllers.updateAdmin);
router.patch("/delete/:id", auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), AdminControllers.softDeleteAdmin);
router.delete("/:id", auth(USER_ROLE.SUPER_ADMIN), AdminControllers.hardDeleteAdmin);
export const AdminRoutes = router;
