import { Router } from "express";
import notesController from "./controller/notesController";
import { middleware } from "../utils/authService";

const router: Router = Router();

export function notesRoutes(): Router {
  router.route("/notes").get(middleware, notesController.getAll);
  router.route("/note/share").get(middleware, notesController.getSharedNotes);
  router.route("/note/:id").get(middleware, notesController.getSingle);
  router.route("/note/").put(middleware, notesController.create);
  router.route("/note/:id").patch(middleware, notesController.update);
  router.route("/note/:id").delete(middleware, notesController.delete);
  router.route("/note/share").post(middleware, notesController.shareNote);
  return router;
}

export default notesRoutes();
