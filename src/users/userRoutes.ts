import { Router } from "express";
import usersController from "./controller/usersController";
import { middleware } from "../utils/authService";
import { getAuthorizeURL } from "../utils/gmail/gmail_auth";

const router: Router = Router();

export function usersRoutes(): Router {
  router.route("/users").get(middleware, usersController.getAll);
  router.route("/user/:id").get(middleware, usersController.getUser);
  router.route("/user").put(usersController.create);
  router
    .route("/oauth")
    .get(middleware, usersController.getGmailAuthorizationToken);
  return router;
}

export default usersRoutes();
