"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EducationRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _EducationController = require("./Education.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _EducationController.EducationControllers.createEducation);
router.get("/", _EducationController.EducationControllers.getAllEducation);
router.get("/:id", _EducationController.EducationControllers.getSingleEducation);
router.patch("/:id", _EducationController.EducationControllers.updateEducation);
router.patch("/:id/position", _EducationController.EducationControllers.updateEducationPosition);
router.delete("/:id", _EducationController.EducationControllers.deleteEducation);
const EducationRoutes = exports.EducationRoutes = router;