import { Router } from "express";
import usersController from "./controller/usersController";
import { middleware } from "../utils/authService";

const router: Router = Router();

export function usersRoutes(): Router {
  router.route("/users").get(middleware, usersController.getAll);
  router.route("/user").put(usersController.create);
  return router;
}

export default usersRoutes();
