import express from "express";

import { PersonalInfoControllers } from "./personalInfo.controller.js";
import textToJsonPerser from "../../middlewares/textToJsonParser.js";
import { upload } from "../../utils/sendFileToCloudinary.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "secondaryProfileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  textToJsonPerser,
  PersonalInfoControllers.createPersonalInfo
);
router.get("/", PersonalInfoControllers.getAllPersonalInfo);
router.get("/:id", PersonalInfoControllers.getSinglePersonalInfo);
router.patch(
  "/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "secondaryProfileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  textToJsonPerser,
  PersonalInfoControllers.updatePersonalInfo
);
router.delete("/:id", PersonalInfoControllers.deletePersonalInfo);

export const PersonalInfoRoutes = router;
