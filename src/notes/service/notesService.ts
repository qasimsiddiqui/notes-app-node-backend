import NotesRepository from "../repository/notesRepository";

const getAllNotes = async (uid: string) => {
  try {
    return await NotesRepository.getAllNotes(uid);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const getSingleNote = async (noteID: string) => {
  try {
    return await NotesRepository.getSingleNote(noteID);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const createNote = async (body: string, author: string) => {
  try {
    return await NotesRepository.createNote(body, author);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const updateNote = async (noteID: string, body: string) => {
  try {
    return await NotesRepository.updateNote(noteID, body);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const deleteNote = async (noteID: string) => {
  try {
    return await NotesRepository.deleteNote(noteID);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const shareNote = async (noteID: string, userID: string) => {
  try {
    return await NotesRepository.shareNote(noteID, userID);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
};
