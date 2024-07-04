"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _AchievementController = require("./Achievement.controller.js");
var _sendFileToCloudinary = require("../../utils/sendFileToCloudinary.js");
var _textToJsonParser = _interopRequireDefault(require("../../middlewares/textToJsonParser.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _sendFileToCloudinary.upload.single("file"), _textToJsonParser.default, _AchievementController.AchievementControllers.createAchievement);
router.get("/", _AchievementController.AchievementControllers.getAllAchievement);
router.get("/:id", _AchievementController.AchievementControllers.getSingleAchievement);
router.patch("/:id", _sendFileToCloudinary.upload.single("file"), _textToJsonParser.default, _AchievementController.AchievementControllers.updateAchievement);
router.patch("/:id/position", _AchievementController.AchievementControllers.updateAchievementPosition);
router.delete("/:id", _AchievementController.AchievementControllers.deleteAchievement);
const AchievementRoutes = exports.AchievementRoutes = router;