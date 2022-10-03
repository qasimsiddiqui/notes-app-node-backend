import { Request, Response } from "express";
import NotesService from "../service/notesService";

class NotesController {
  /**
   * @route GET /api/notes
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const notes = await NotesService.getAllNotes(res.locals.uid);
      res.status(200).send(notes);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * @route GET /api/note/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async getSingle(req: Request, res: Response): Promise<void> {
    const noteId = req.params.id;
    try {
      const note = await NotesService.getSingleNote(noteId, res.locals.uid);
      res.status(200).send(note);
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ error: "Server error", message: error.message });
    }
  }

  /**
   * @route PUT /api/note
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async create(req: Request, res: Response): Promise<void> {
    const { body, authorId, authorName } = req.body;
    try {
      const result = await NotesService.createNote(body, authorId, authorName);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * @route PATCH /api/note/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async update(req: Request, res: Response): Promise<void> {
    const { body } = req.body;
    const noteId = req.params.id;
    try {
      const result = await NotesService.updateNote(noteId, body);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * @route DELETE /api/note/:id
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async delete(req: Request, res: Response): Promise<void> {
    const noteId = req.params.id;
    try {
      const result = await NotesService.deleteNote(noteId, res.locals.uid);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * @route POST /api/note/share
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async shareNote(req: Request, res: Response): Promise<void> {
    const { noteId, userId } = req.body;
    try {
      const result = await NotesService.shareNote(
        noteId,
        userId,
        res.locals.uid
      );
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * @route GET /api/note/share
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async getSharedNotes(req: Request, res: Response): Promise<void> {
    try {
      const result = await NotesService.getSharedNotes(res.locals.uid);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }
}

export default new NotesController();
