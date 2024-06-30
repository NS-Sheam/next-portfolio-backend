
import express from "express";

import {
  SkillControllers,
} from "./Skill.controller.js";

const router = express.Router();

router.post("/", 
SkillControllers.createSkill);
router.get("/", 
SkillControllers.getAllSkill);
router.get("/:id", 
SkillControllers.getSingleSkill);
router.patch("/:id", 
SkillControllers.updateSkill);
router.delete("/:id", 
SkillControllers.deleteSkill);

export const SkillRoutes = router;
