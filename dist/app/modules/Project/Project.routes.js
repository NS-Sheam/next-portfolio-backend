"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _ProjectController = require("./Project.controller.js");
var _sendImageToCloudinary = require("../../utils/sendImageToCloudinary.js");
var _textToJsonParser = _interopRequireDefault(require("../../middlewares/textToJsonParser.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _ProjectController.ProjectControllers.createProject);
router.get("/", _ProjectController.ProjectControllers.getAllProject);
router.get("/:id", _ProjectController.ProjectControllers.getSingleProject);
router.patch("/:id", _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _ProjectController.ProjectControllers.updateProject);
router.patch("/:id/position", _ProjectController.ProjectControllers.updateProjectPosition);
router.delete("/:id", _ProjectController.ProjectControllers.deleteProject);
const ProjectRoutes = exports.ProjectRoutes = router;