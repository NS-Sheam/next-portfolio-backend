"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalInfoRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _PersonalInfoController = require("./PersonalInfo.controller.js");
var _sendImageToCloudinary = require("../../utils/sendImageToCloudinary.js");
var _textToJsonParser = _interopRequireDefault(require("../../middlewares/textToJsonParser.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _PersonalInfoController.PersonalInfoControllers.createPersonalInfo);
router.get("/", _PersonalInfoController.PersonalInfoControllers.getAllPersonalInfo);
router.get("/:id", _PersonalInfoController.PersonalInfoControllers.getSinglePersonalInfo);
router.patch("/:id", _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _PersonalInfoController.PersonalInfoControllers.updatePersonalInfo);
router.delete("/:id", _PersonalInfoController.PersonalInfoControllers.deletePersonalInfo);
const PersonalInfoRoutes = exports.PersonalInfoRoutes = router;