import express from "express";

import { EducationControllers } from "./Education.controller.js";

const router = express.Router();

router.post("/", EducationControllers.createEducation);
router.get("/", EducationControllers.getAllEducation);
router.get("/:id", EducationControllers.getSingleEducation);
router.patch("/:id", EducationControllers.updateEducation);
router.patch("/:id/position", EducationControllers.updateEducationPosition);
router.delete("/:id", EducationControllers.deleteEducation);

export const EducationRoutes = router;
