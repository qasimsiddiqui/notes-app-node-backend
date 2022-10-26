import { Router } from "express";
import commentsController from "./controller/commentsController";
import { middleware } from "../utils/authService";

const router: Router = Router();

export function commentsRoutes(): Router {
  /**
   * @swagger
   * /note/{id}/comments:
   *   get:
   *     tags:
   *       - Comments
   *     summary: Retrieve a list of all comments for a note
   *     description: Retrieve a list of all comments for a note
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of note of which comments to retrieve
   *     responses:
   *       '200':
   *          description: A list of comments
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Comment'
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
  router.route("/note/:id/comments").get(middleware, commentsController.getAll);

  /**
   * @swagger
   * /note/{id}/comment:
   *   put:
   *     tags:
   *       - Comments
   *     summary: Add a new comment to a note
   *     description: Add a new comment to a note
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of note to add comment to
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               author:
   *                 type: string
   *                 description: Name of the author
   *               content:
   *                  type: string
   *                  description: Content of the comment
   *               noteAuthorId:
   *                 type: string
   *                 description: ID of the author
   *     responses:
   *       '200':
   *          description: A new comment added
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Response message
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
  router
    .route("/note/:id/comment")
    .put(middleware, commentsController.addComment);

  /**
   * @swagger
   * /note/{id}/comment/{commentId}:
   *   delete:
   *     tags:
   *       - Comments
   *     summary: Delete a comment
   *     description: Delete a comment
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of note to add comment to
   *       - in: path
   *         name: commentId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of comment to delete
   *     responses:
   *       '200':
   *          description: Comment deleted
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Response message
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
  router
    .route("/note/:id/comment/:commentId")
    .delete(middleware, commentsController.deleteComment);

  /**
   * @swagger
   * /note/{id}/comment/{commentId}:
   *   patch:
   *     tags:
   *       - Comments
   *     summary: Update a comment
   *     description: Update a comment
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           description: ID of note to update comment to
   *       - in: path
   *         name: commentId
   *         required: true
   *         schema:
   *           type: string
   *           description: Commment ID to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               content:
   *                 type: string
   *                 description: updated comment content
   *     responses:
   *       '200':
   *          description: Comment updated
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: string
   *                    description: Response message
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
  router
    .route("/note/:id/comment/:commentId")
    .patch(middleware, commentsController.updateComment);

  return router;
}

export default commentsRoutes();
