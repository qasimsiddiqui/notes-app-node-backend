import { Router } from "express";
import usersController from "./controller/usersController";

const router: Router = Router();

export function usersRoutes(): Router {
  router.route("/users").get(usersController.getAll);
  router.route("/user").put(usersController.create);
  return router;
}

export default usersRoutes();
