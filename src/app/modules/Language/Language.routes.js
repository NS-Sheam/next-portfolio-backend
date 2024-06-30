
import express from "express";

import {
  LanguageControllers,
} from "./Language.controller.js";

const router = express.Router();

router.post("/", 
LanguageControllers.createLanguage);
router.get("/", 
LanguageControllers.getAllLanguage);
router.get("/:id", 
LanguageControllers.getSingleLanguage);
router.patch("/:id", 
LanguageControllers.updateLanguage);
router.delete("/:id", 
LanguageControllers.deleteLanguage);

export const LanguageRoutes = router;
