"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _SkillController = require("./Skill.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _SkillController.SkillControllers.createSkill);
router.get("/", _SkillController.SkillControllers.getAllSkill);
router.get("/:id", _SkillController.SkillControllers.getSingleSkill);
router.patch("/:id", _SkillController.SkillControllers.updateSkill);
router.delete("/:id", _SkillController.SkillControllers.deleteSkill);
const SkillRoutes = exports.SkillRoutes = router;