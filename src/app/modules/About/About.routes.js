import express from "express";

import { AboutControllers } from "./About.controller.js";

const router = express.Router();

router.post("/", AboutControllers.createAbout);
router.get("/", AboutControllers.getAllAbout);
router.get("/:id", AboutControllers.getSingleAbout);
router.patch("/:id", AboutControllers.updateAbout);
router.delete("/:id", AboutControllers.deleteAbout);

export const AboutRoutes = router;
