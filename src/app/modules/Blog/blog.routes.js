import express from "express";

import auth from "../../middlewares/auth.js";
import { USER_ROLE } from "../User/user.const.js";
import { BlogsControllers } from "./blog.controller.js";
import { upload } from "../../utils/sendFileToCloudinary.js";
import textToJsonPerser from "../../middlewares/textToJsonParser.js";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  upload.single("file"),
  textToJsonPerser,

  BlogsControllers.createBlog
);

router.get("/:id", BlogsControllers.getBlogById);
router.get("/", BlogsControllers.getAllBlogs);

router.patch("/:id", auth(USER_ROLE.ADMIN), upload.single("file"), textToJsonPerser, BlogsControllers.updateBlog);

router.delete("/:id", auth(USER_ROLE.ADMIN), BlogsControllers.deleteBlog);

export const BlogRoutes = router;
