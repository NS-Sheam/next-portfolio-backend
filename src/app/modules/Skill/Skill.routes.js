import express from "express";

import { SkillControllers } from "./Skill.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";
import textToJsonPerser from "../../middlewares/textToJsonParser.js";

const router = express.Router();

router.post("/", upload.single("file"), textToJsonPerser, SkillControllers.createSkill);
router.get("/", SkillControllers.getAllSkill);
router.get("/:id", SkillControllers.getSingleSkill);
router.patch("/:id", upload.single("file"), textToJsonPerser, SkillControllers.updateSkill);
router.delete("/:id", SkillControllers.deleteSkill);

export const SkillRoutes = router;
