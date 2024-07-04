import express from "express";

import { PersonalInfoControllers } from "./PersonalInfo.controller.js";
import { upload } from "../../utils/sendFileToCloudinary.js";
import textToJsonPerser from "../../middlewares/textToJsonParser.js";

const router = express.Router();

router.post("/", upload.single("file"), textToJsonPerser, PersonalInfoControllers.createPersonalInfo);
router.get("/", PersonalInfoControllers.getAllPersonalInfo);
router.get("/:id", PersonalInfoControllers.getSinglePersonalInfo);
router.patch("/:id", upload.single("file"), textToJsonPerser, PersonalInfoControllers.updatePersonalInfo);
router.delete("/:id", PersonalInfoControllers.deletePersonalInfo);

export const PersonalInfoRoutes = router;
