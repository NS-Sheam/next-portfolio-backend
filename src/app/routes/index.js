import { Router } from "express";
import { AboutRoutes } from "../modules/About/About.routes.js";
import { UserRoutes } from "../modules/User/user.routes.js";
import { AuthRoutes } from "../modules/Auth/auth.routes.js";
import { BlogRoutes } from "../modules/Blog/blog.routes.js";

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
];
moduleRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
