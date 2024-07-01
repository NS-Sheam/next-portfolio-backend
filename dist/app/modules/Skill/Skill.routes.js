"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _SkillController = require("./Skill.controller.js");
var _sendImageToCloudinary = require("../../utils/sendImageToCloudinary.js");
var _textToJsonParser = _interopRequireDefault(require("../../middlewares/textToJsonParser.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _SkillController.SkillControllers.createSkill);
router.get("/", _SkillController.SkillControllers.getAllSkill);
router.get("/:id", _SkillController.SkillControllers.getSingleSkill);
router.patch("/:id", _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _SkillController.SkillControllers.updateSkill);
router.delete("/:id", _SkillController.SkillControllers.deleteSkill);
const SkillRoutes = exports.SkillRoutes = router;