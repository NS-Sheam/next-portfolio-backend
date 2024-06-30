"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _AboutRoutes = require("../modules/About/About.routes.js");
var _userRoutes = require("../modules/User/user.routes.js");
var _authRoutes = require("../modules/Auth/auth.routes.js");
var _blogRoutes = require("../modules/Blog/blog.routes.js");
const router = (0, _express.Router)();
const moduleRoutes = [{
  path: "/about",
  route: _AboutRoutes.AboutRoutes
}, {
  path: "/users",
  route: _userRoutes.UserRoutes
}, {
  path: "/auth",
  route: _authRoutes.AuthRoutes
}, {
  path: "/blogs",
  route: _blogRoutes.BlogRoutes
}];
moduleRoutes.forEach(route => router.use(route?.path, route?.route));
var _default = exports.default = router;