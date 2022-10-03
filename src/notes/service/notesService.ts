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
   * @param noteID ID of note to be fetched
   * @param uid ID of user who is fetching the note
   * @returns { Promise<NotesInterface> } note
   */
  async getSingleNote(noteID: string, uid: string): Promise<NotesInterface> {
    try {
      return await NotesRepository.getSingleNote(noteID, uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Create a new note
   * @param {string} body content of the note
   * @param {string} author_id ID of the author of note
   * @param {string} author_name Name of the author of note
   * @returns {Promise}
   */
  async createNote(body: string, author_id: string, author_name: string) {
    try {
      return await NotesRepository.createNote(body, author_id, author_name);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Update a note
   * @param {string} noteID ID of note to be updated
   * @param {string} body new content of the note body
   * @returns {Promise}
   */
  async updateNote(noteID: string, body: string): Promise<any> {
    try {
      return await NotesRepository.updateNote(noteID, body);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Delete a note
   * @param {string} noteID ID of note to be deleted
   * @returns {Promise}
   */
  async deleteNote(noteID: string): Promise<any> {
    try {
      return await NotesRepository.deleteNote(noteID);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Share a note with a list of users
   * @param {string} noteID  ID of note to be shared
   * @param {string[]} usersList List of userIDs to whom note is shared
   * @param {string} userID ID of the note author
   * @returns {Promise}
   */
  async shareNote(
    noteID: string,
    usersList: [string],
    userID: string
  ): Promise<any> {
    try {
      return await NotesRepository.shareNote(noteID, usersList, userID);
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
