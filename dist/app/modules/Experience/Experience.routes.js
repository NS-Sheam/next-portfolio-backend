"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExperienceRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _ExperienceController = require("./Experience.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _ExperienceController.ExperienceControllers.createExperience);
router.get("/", _ExperienceController.ExperienceControllers.getAllExperience);
router.get("/:id", _ExperienceController.ExperienceControllers.getSingleExperience);
router.patch("/:id", _ExperienceController.ExperienceControllers.updateExperience);
router.delete("/:id", _ExperienceController.ExperienceControllers.deleteExperience);
const ExperienceRoutes = exports.ExperienceRoutes = router;