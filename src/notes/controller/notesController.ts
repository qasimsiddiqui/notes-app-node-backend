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
    const noteID = req.params.id;
    try {
      const note = await NotesService.getSingleNote(noteID, res.locals.uid);
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
    const { body, author_id, author_name }: any = req.body;
    try {
      const result = await NotesService.createNote(
        body,
        author_id,
        author_name
      );
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
    const noteID = req.params.id;
    try {
      const result = await NotesService.updateNote(noteID, body);
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
    const noteID = req.params.id;
    try {
      const result = await NotesService.deleteNote(noteID);
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
    const { noteID, userID }: any = req.body;
    try {
      const result = await NotesService.shareNote(
        noteID,
        userID,
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
