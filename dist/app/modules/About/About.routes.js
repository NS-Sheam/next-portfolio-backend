"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AboutRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _AboutController = require("./About.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _AboutController.AboutControllers.createAbout);
router.get("/", _AboutController.AboutControllers.getAllAbout);
router.get("/:id", _AboutController.AboutControllers.getSingleAbout);
router.patch("/:id", _AboutController.AboutControllers.updateAbout);
router.delete("/:id", _AboutController.AboutControllers.deleteAbout);
const AboutRoutes = exports.AboutRoutes = router;