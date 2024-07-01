import express from "express";

import { AchievementControllers } from "./Achievement.controller.js";
import { upload } from "../../utils/sendImageToCloudinary.js";
import textToJsonPerser from "../../middlewares/textToJsonParser.js";

const router = express.Router();

router.post("/", upload.single("file"), textToJsonPerser, AchievementControllers.createAchievement);
router.get("/", AchievementControllers.getAllAchievement);
router.get("/:id", AchievementControllers.getSingleAchievement);
router.patch("/:id", upload.single("file"), textToJsonPerser, AchievementControllers.updateAchievement);
router.patch("/:id/position", AchievementControllers.updateAchievementPosition);
router.delete("/:id", AchievementControllers.deleteAchievement);

export const AchievementRoutes = router;
