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

const createNote = async (
  body: string,
  author_id: string,
  author_name: string
) => {
  try {
    return await NotesRepository.createNote(body, author_id, author_name);
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

const getSharedNotes = async (uid: string) => {
  try {
    return await NotesRepository.getSharedNotes(uid);
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
  getSharedNotes,
};
