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
   *     responses:
   *       '200':
   *          description: An array of notes
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Note'
   *       '500':
   *          description: Server error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                    description: Error message
   */
  router.route("/notes").get(middleware, notesController.getAll);

  /**
   * @swagger
   * /note/share:
   *   get:
   *     tags:
   *      - Notes
   *     summary: Retrieve a list of all notes shared with user
   *     description: Retrieve a list of all notes that are shared with the user
   *     responses:
   *       '200':
   *          description: An array of notes
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Note'
   *       '500':
   *          description: Server error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                    description: Error message
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
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of note to retrieve
   *     responses:
   *       '200':
   *          description: A single note
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Note'
   *       '500':
   *          description: Server error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                    description: Error type
   *                  message:
   *                    type: string
   *                    description: Error message
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
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             body:
   *               type: string
   *               description: Content of the note
   *             authorId:
   *               type: string
   *               description: ID of the author
   *             authorName:
   *               type: string
   *               description: Name of the author
   *     responses:
   *       '200':
   *          description: A single note
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Note'
   *       '500':
   *          description: Server error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                    description: Error message
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
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             body:
   *               type: string
   *               description: Content of the note
   *     responses:
   *       '200':
   *          description: A single note
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Note'
   *       '500':
   *          description: Server error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                    description: Error message
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
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of note to retrieve
   *     responses:
   *       '200':
   *          description: A single note
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Note'
   *       '500':
   *          description: Server error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                    description: Error message
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
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             noteId:
   *               type: string
   *               description: ID of the note
   *             userId:
   *               type: array
   *               description: IDs of the users to share the note with
   *               items:
   *                 type: string
   *     responses:
   *       '200':
   *          description: Note shared
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Note'
   *       '500':
   *          description: Server error
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: string
   *                    description: Error message
   */
  router.route("/note/share").post(middleware, notesController.shareNote);

  return router;
}

export default notesRoutes();
