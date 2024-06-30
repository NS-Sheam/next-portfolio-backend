"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HobbyRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _HobbyController = require("./Hobby.controller.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _HobbyController.HobbyControllers.createHobby);
router.get("/", _HobbyController.HobbyControllers.getAllHobby);
router.get("/:id", _HobbyController.HobbyControllers.getSingleHobby);
router.patch("/:id", _HobbyController.HobbyControllers.updateHobby);
router.delete("/:id", _HobbyController.HobbyControllers.deleteHobby);
const HobbyRoutes = exports.HobbyRoutes = router;