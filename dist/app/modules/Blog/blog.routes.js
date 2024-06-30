"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlogRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../../middlewares/auth.js"));
var _userConst = require("../User/user.const.js");
var _blogController = require("./blog.controller.js");
var _sendImageToCloudinary = require("../../utils/sendImageToCloudinary.js");
var _textToJsonParser = _interopRequireDefault(require("../../middlewares/textToJsonParser.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", (0, _auth.default)(_userConst.USER_ROLE.ADMIN), _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _blogController.BlogsControllers.createBlog);
router.get("/:id", _blogController.BlogsControllers.getBlogById);
router.get("/", _blogController.BlogsControllers.getAllBlogs);
router.patch("/:id", (0, _auth.default)(_userConst.USER_ROLE.ADMIN), _sendImageToCloudinary.upload.single("file"), _textToJsonParser.default, _blogController.BlogsControllers.updateBlog);
router.delete("/:id", (0, _auth.default)(_userConst.USER_ROLE.ADMIN), _blogController.BlogsControllers.deleteBlog);
const BlogRoutes = exports.BlogRoutes = router;