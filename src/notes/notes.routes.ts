import { Router } from "express";
import notesController from "./controller/notesController";
import { middleware } from "../utils/authService";

const router: Router = Router();

export function notesRoutes(): Router {
  /**
   * @swagger
   * /notes:
   *   get:
   *     tags:
   *      - Notes
   *     summary: Retrieve a list of all user's notes
   *     description: Retrieve a list of all user's notes that the user is authored
   */
  router.route("/notes").get(middleware, notesController.getAll);

  /**
   * @swagger
   * /note/share:
   *   get:
   *     tags:
   *      - Notes
   *     summary: Retrieve a list of all user's notes
   *     description: Retrieve a list of all user's notes that the user is authored
   */
  router.route("/note/share").get(middleware, notesController.getSharedNotes);

  /**
   * @swagger
   * /note/{id}:
   *   get:
   *     tags:
   *      - Notes
   *     summary: Retrieve a note by id
   *     description: Retrieve a note by id
   */
  router.route("/note/:id").get(middleware, notesController.getSingle);

  /**
   * @swagger
   * /note:
   *   put:
   *     tags:
   *      - Notes
   *     summary: Create a new note
   *     description: Create a new note
   */
  router.route("/note/").put(middleware, notesController.create);

  /**
   * @swagger
   * /note/{id}:
   *   patch:
   *     tags:
   *      - Notes
   *     summary: Update a new note
   *     description: Update a new note
   */
  router.route("/note/:id").patch(middleware, notesController.update);

  /**
   * @swagger
   * /note/{id}:
   *   delete:
   *     tags:
   *      - Notes
   *     summary: Delete a new note
   *     description: Delete a new note
   */
  router.route("/note/:id").delete(middleware, notesController.delete);

  /**
   * @swagger
   * /note/share:
   *   post:
   *     tags:
   *      - Notes
   *     summary: Share a note
   *     description: Share a note with a list of users
   */
  router.route("/note/share").post(middleware, notesController.shareNote);

  return router;
}

export default notesRoutes();
