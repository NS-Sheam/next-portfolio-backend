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
var _SkillRoutes = require("../modules/Skill/Skill.routes.js");
var _EducationRoutes = require("../modules/Education/Education.routes.js");
var _ExperienceRoutes = require("../modules/Experience/Experience.routes.js");
var _AchievementRoutes = require("../modules/Achievement/Achievement.routes.js");
var _HobbiesAndInterestRoutes = require("../modules/HobbiesAndInterest/HobbiesAndInterest.routes.js");
var _LanguageRoutes = require("../modules/Language/Language.routes.js");
var _PersonalInfoRoutes = require("../modules/PersonalInfo/PersonalInfo.routes.js");
var _ProjectRoutes = require("../modules/Project/Project.routes.js");
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
}, {
  path: "/skills",
  route: _SkillRoutes.SkillRoutes
}, {
  path: "/experiences",
  route: _ExperienceRoutes.ExperienceRoutes
}, {
  path: "/educations",
  route: _EducationRoutes.EducationRoutes
}, {
  path: "/achievements",
  route: _AchievementRoutes.AchievementRoutes
}, {
  path: "/hobbies-and-interests",
  route: _HobbiesAndInterestRoutes.HobbiesAndInterestRoutes
}, {
  path: "/languages",
  route: _LanguageRoutes.LanguageRoutes
}, {
  path: "/personal-info",
  route: _PersonalInfoRoutes.PersonalInfoRoutes
}, {
  path: "/projects",
  route: _ProjectRoutes.ProjectRoutes
}];
moduleRoutes.forEach(route => router.use(route?.path, route?.route));
var _default = exports.default = router;