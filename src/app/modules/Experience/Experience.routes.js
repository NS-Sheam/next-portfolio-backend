
import express from "express";

import {
  ExperienceControllers,
} from "./Experience.controller.js";

const router = express.Router();

router.post("/", 
ExperienceControllers.createExperience);
router.get("/", 
ExperienceControllers.getAllExperience);
router.get("/:id", 
ExperienceControllers.getSingleExperience);
router.patch("/:id", 
ExperienceControllers.updateExperience);
router.delete("/:id", 
ExperienceControllers.deleteExperience);

export const ExperienceRoutes = router;
