import express from "express";

import { HobbiesAndInterestControllers } from "./HobbiesAndInterest.controller.js";

const router = express.Router();

router.post("/", HobbiesAndInterestControllers.createHobbiesAndInterest);
router.get("/", HobbiesAndInterestControllers.getAllHobbiesAndInterest);
router.get("/:id", HobbiesAndInterestControllers.getSingleHobbiesAndInterest);
router.patch("/:id", HobbiesAndInterestControllers.updateHobbiesAndInterest);
router.patch("/:id/position", HobbiesAndInterestControllers.updateHobbiesAndInterestPosition);
router.delete("/:id", HobbiesAndInterestControllers.deleteHobbiesAndInterest);

export const HobbiesAndInterestRoutes = router;
