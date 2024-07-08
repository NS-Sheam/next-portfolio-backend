import { Router } from "express";
import { AboutRoutes } from "../modules/About/About.routes.js";
import { UserRoutes } from "../modules/User/user.routes.js";
import { AuthRoutes } from "../modules/Auth/auth.routes.js";
import { BlogRoutes } from "../modules/Blog/blog.routes.js";
import { SkillRoutes } from "../modules/Skill/Skill.routes.js";
import { EducationRoutes } from "../modules/Education/Education.routes.js";
import { ExperienceRoutes } from "../modules/Experience/Experience.routes.js";
import { AchievementRoutes } from "../modules/Achievement/Achievement.routes.js";
import { HobbiesAndInterestRoutes } from "../modules/HobbiesAndInterest/HobbiesAndInterest.routes.js";
import { LanguageRoutes } from "../modules/Language/Language.routes.js";
import { PersonalInfoRoutes } from "../modules/PersonalInfo/PersonalInfo.routes.js";
import { ProjectRoutes } from "../modules/Project/Project.routes.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/about",
    route: AboutRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/experiences",
    route: ExperienceRoutes,
  },
  {
    path: "/educations",
    route: EducationRoutes,
  },
  {
    path: "/achievements",
    route: AchievementRoutes,
  },
  {
    path: "/hobbies-and-interest",
    route: HobbiesAndInterestRoutes,
  },
  {
    path: "/languages",
    route: LanguageRoutes,
  },
  {
    path: "/personal-info",
    route: PersonalInfoRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
