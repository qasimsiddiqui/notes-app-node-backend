import { Request, Response } from "express";
import CommentsService from "../service/commentService";

class CommentsController {
  async getAll(req: Request, res: Response) {
    const noteID = req.params.id;
    try {
      const comments = await CommentsService.getAll(noteID);
      res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async addComment(req: Request, res: Response) {
    const noteID = req.params.id;
    const { author, content, note_author_id } = req.body;
    try {
      const comments = await CommentsService.addComment(
        noteID,
        note_author_id,
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

  async deleteComment(req: Request, res: Response) {
    const noteID = req.params.id;
    const commentID = req.params.commentID;
    try {
      const comments = await CommentsService.deleteComment(
        noteID,
        commentID,
        res.locals.uid
      );
      res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async updateComment(req: Request, res: Response) {
    const noteID = req.params.id;
    const commentID = req.params.commentID;
    const { content } = req.body;
    try {
      const comments = await CommentsService.updateComment(
        noteID,
        commentID,
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
