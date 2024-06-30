"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _LanguageController = require("./Language.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _LanguageController.LanguageControllers.createLanguage);
router.get("/", _LanguageController.LanguageControllers.getAllLanguage);
router.get("/:id", _LanguageController.LanguageControllers.getSingleLanguage);
router.patch("/:id", _LanguageController.LanguageControllers.updateLanguage);
router.delete("/:id", _LanguageController.LanguageControllers.deleteLanguage);
const LanguageRoutes = exports.LanguageRoutes = router;