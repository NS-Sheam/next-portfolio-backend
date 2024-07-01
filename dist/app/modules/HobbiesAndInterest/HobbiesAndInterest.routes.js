"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HobbiesAndInterestRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _HobbiesAndInterestController = require("./HobbiesAndInterest.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _HobbiesAndInterestController.HobbiesAndInterestControllers.createHobbiesAndInterest);
router.get("/", _HobbiesAndInterestController.HobbiesAndInterestControllers.getAllHobbiesAndInterest);
router.get("/:id", _HobbiesAndInterestController.HobbiesAndInterestControllers.getSingleHobbiesAndInterest);
router.patch("/:id", _HobbiesAndInterestController.HobbiesAndInterestControllers.updateHobbiesAndInterest);
router.patch("/:id/position", _HobbiesAndInterestController.HobbiesAndInterestControllers.updateHobbiesAndInterestPosition);
router.delete("/:id", _HobbiesAndInterestController.HobbiesAndInterestControllers.deleteHobbiesAndInterest);
const HobbiesAndInterestRoutes = exports.HobbiesAndInterestRoutes = router;