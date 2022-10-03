import { Router } from "express";
import commentsController from "./controller/commentsController";
import { middleware } from "../utils/authService";

const router: Router = Router();

export function commentsRoutes(): Router {
  router.route("/note/:id/comments").get(middleware, commentsController.getAll);

  router
    .route("/note/:id/comment")
    .put(middleware, commentsController.addComment);

  router
    .route("/note/:id/comment/:commentId")
    .delete(middleware, commentsController.deleteComment);

  router
    .route("/note/:id/comment/:commentId")
    .patch(middleware, commentsController.updateComment);

  return router;
}

export default commentsRoutes();
