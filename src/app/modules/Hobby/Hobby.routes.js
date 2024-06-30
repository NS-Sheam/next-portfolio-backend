
import express from "express";

import {
  HobbyControllers,
} from "./Hobby.controller.js";

const router = express.Router();

router.post("/", 
HobbyControllers.createHobby);
router.get("/", 
HobbyControllers.getAllHobby);
router.get("/:id", 
HobbyControllers.getSingleHobby);
router.patch("/:id", 
HobbyControllers.updateHobby);
router.delete("/:id", 
HobbyControllers.deleteHobby);

export const HobbyRoutes = router;
