
import express from "express";

import {
  AchievementControllers,
} from "./Achievement.controller.js";

const router = express.Router();

router.post("/", 
AchievementControllers.createAchievement);
router.get("/", 
AchievementControllers.getAllAchievement);
router.get("/:id", 
AchievementControllers.getSingleAchievement);
router.patch("/:id", 
AchievementControllers.updateAchievement);
router.delete("/:id", 
AchievementControllers.deleteAchievement);

export const AchievementRoutes = router;
