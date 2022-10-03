import { NotesInterface } from "../model/notes.interface";
import NotesRepository from "../repository/notesRepository";

class NotesService {
  /**
   * Notes Service
   * Get all notes for a user
   * @param {string} uid  user id from Authorization header
   * @returns {Promise<NotesInterface[]>} array of notes
   */
  async getAllNotes(uid: string): Promise<NotesInterface[]> {
    try {
      return await NotesRepository.getAllNotes(uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Notes Service
   * Get a single note for a user
   * @param noteId ID of note to be fetched
   * @param uid ID of user who is fetching the note
   * @returns { Promise<NotesInterface> } note
   */
  async getSingleNote(noteId: string, uid: string): Promise<NotesInterface> {
    try {
      return await NotesRepository.getSingleNote(noteId, uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Create a new note
   * @param {string} body content of the note
   * @param {string} authorId ID of the author of note
   * @param {string} authorName Name of the author of note
   * @returns {Promise}
   */
  async createNote(body: string, authorId: string, authorName: string) {
    try {
      return await NotesRepository.createNote(body, authorId, authorName);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Update a note
   * @param {string} noteId ID of note to be updated
   * @param {string} body new content of the note body
   * @returns {Promise}
   */
  async updateNote(noteId: string, body: string, uid: string): Promise<any> {
    try {
      return await NotesRepository.updateNote(noteId, body, uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Delete a note
   * @param {string} noteId ID of note to be deleted
   * @returns {Promise}
   */
  async deleteNote(noteId: string, uid: string): Promise<any> {
    try {
      return await NotesRepository.deleteNote(noteId, uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Share a note with a list of users
   * @param {string} noteId  ID of note to be shared
   * @param {string[]} usersList List of userIDs to whom note is shared
   * @param {string} userId ID of the note author
   * @returns {Promise}
   */
  async shareNote(
    noteId: string,
    usersList: [string],
    userId: string
  ): Promise<any> {
    try {
      return await NotesRepository.shareNote(noteId, usersList, userId);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Get all notes shared with user
   * @param {string} uid ID of user whose shared notes to fetch
   * @returns {Promise<NotesInterface[]>}
   */
  async getSharedNotes(uid: string): Promise<NotesInterface[]> {
    try {
      return await NotesRepository.getSharedNotes(uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default new NotesService();
