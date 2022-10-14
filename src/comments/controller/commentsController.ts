import { Request, Response } from "express";
import CommentsService from "../service/commentService";

class CommentsController {
  /**
   * Get all comments for a note
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async getAll(req: Request, res: Response): Promise<void> {
    const noteId = req.params.id;
    try {
      const comments = await CommentsService.getAll(noteId);
      res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * Add a comment to a note
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async addComment(req: Request, res: Response): Promise<void> {
    const noteId = req.params.id;
    const { author, content, noteAuthorId } = req.body;
    try {
      const comments = await CommentsService.addComment(
        noteId,
        noteAuthorId,
        res.locals.uid,
        author,
        content
      );
      res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * Delete a comment
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async deleteComment(req: Request, res: Response): Promise<void> {
    const noteId = req.params.id;
    const commentId = req.params.commentId;
    try {
      const comments = await CommentsService.deleteComment(
        noteId,
        commentId,
        res.locals.uid
      );
      res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * Edit a comment
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async updateComment(req: Request, res: Response): Promise<void> {
    const noteId = req.params.id;
    const commentId = req.params.commentId;
    const { content } = req.body;
    try {
      const comments = await CommentsService.updateComment(
        noteId,
        commentId,
        res.locals.uid,
        content
      );
      res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }
}

export default new CommentsController();
