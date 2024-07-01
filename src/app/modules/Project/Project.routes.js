import express from "express";

import { ProjectControllers } from "./Project.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";
import textToJsonPerser from "../../middlewares/textToJsonParser.js";

const router = express.Router();

router.post("/", upload.single("file"), textToJsonPerser, ProjectControllers.createProject);
router.get("/", ProjectControllers.getAllProject);
router.get("/:id", ProjectControllers.getSingleProject);
router.patch("/:id", upload.single("file"), textToJsonPerser, ProjectControllers.updateProject);
router.patch("/:id/position", ProjectControllers.updateProjectPosition);
router.delete("/:id", ProjectControllers.deleteProject);

export const ProjectRoutes = router;
