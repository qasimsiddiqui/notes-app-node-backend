import { Request, Response } from "express";
import NotesService from "../service/notesService";

class NotesController {
  async getAll(req: Request, res: Response) {
    try {
      const notes = await NotesService.getAllNotes(res.locals.uid);
      res.status(200).send(notes);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async getSingle(req: Request, res: Response) {
    const noteID = req.params.id;
    try {
      const note = await NotesService.getSingleNote(noteID);
      res.status(200).send(note);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async create(req: Request, res: Response) {
    const { body, author }: any = req.body;
    try {
      const result = await NotesService.createNote(body, author);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async update(req: Request, res: Response) {
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

  async delete(req: Request, res: Response) {
    const noteID = req.params.id;
    try {
      const result = await NotesService.deleteNote(noteID);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async shareNote(req: Request, res: Response) {
    const { noteID, userID }: any = req.body;
    try {
      const result = await NotesService.shareNote(noteID, userID);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async getSharedNotes(req: Request, res: Response) {
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
