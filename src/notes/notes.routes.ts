import { Router } from "express";
import notesController from "./controller/notesController";

const router: Router = Router();

export function notesRoutes(): Router {
  router.route("/notes").get(notesController.getAll);
  router.route("/note/:id").get(notesController.getSingle);
  router.route("/note/").put(notesController.create);
  router.route("/note/:id").patch(notesController.update);
  router.route("/note/:id").delete(notesController.delete);
  return router;
}

export default notesRoutes();
