import db from "../../firebase";
import * as NotificationRepository from "../../notifications/repository/notifications.repository";
import {
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  DocumentReference,
} from "firebase-admin/lib/firestore";
import { NotesInterface } from "../model/notes.interface";

class NotesRepository {
  /**
   * @async
   * @function Get all notes for a user
   * @param {string} uid user id from Authorization header
   * @returns {Promise<NotesInterface[]>} array of notes
   */
  async getAllNotes(uid: string): Promise<NotesInterface[]> {
    const querySnapshot: QuerySnapshot = await db
      .collection("notes")
      .where("author_id", "==", uid)
      .get();
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot): NotesInterface => {
        return doc.data() as NotesInterface;
      }
    );
  }

  /**
   * @async
   * @function Get a single note for a user
   * @param {string} noteId ID of note to be fetched
   * @param {string} uid ID of user who is fetching the note
   * @returns { Promise<NotesInterface> } note
   */
  async getSingleNote(noteId: string, uid: string): Promise<NotesInterface> {
    const doc: DocumentSnapshot = await db
      .collection("notes")
      .doc(noteId)
      .get();

    if (!doc.exists) {
      throw new Error("Note not found");
    }

    const note: NotesInterface = doc.data() as NotesInterface;

    // Check if user is the author or the note is shared with the user
    if (note.author_id !== uid && !note.shared_to.includes(uid)) {
      throw new Error("You are not authorized to view this note");
    }

    return note;
  }

  /**
   * @async
   * @function Create a new note
   * @param {string} body content of the note
   * @param {string} authorId ID of the author of note
   * @param {string} authorName Name of the author of note
   * @returns {Promise}
   */
  async createNote(
    body: string,
    authorId: string,
    authorName: string
  ): Promise<any> {
    const docRef: DocumentReference = db.collection("notes").doc();
    return await docRef
      .set({
        id: docRef.id,
        body,
        author_id: authorId,
        author_name: authorName,
        time_created: Date.now(),
        time_updated: Date.now(),
        isEdited: false,
        shared_to: [],
      })
      .then(() => {
        return { message: "New Note added" };
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  /**
   * @async
   * @function Update a note
   * @param {string} noteId ID of note to be updated
   * @param {string} body new content of the note body
   * @returns {Promise}
   */
  async updateNote(noteId: string, body: string): Promise<any> {
    const doc: DocumentSnapshot = await db
      .collection("notes")
      .doc(noteId)
      .get();

    if (!doc.exists) {
      throw new Error("No note with this id");
    }

    return await doc.ref
      .update({ body: body, time_updated: Date.now(), isEdited: true })
      .then(() => {
        return { message: "Data updated" };
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  /**
   * @async
   * @function Delete a note
   * @param {string} noteId ID of note to be deleted
   * @returns {Promise}
   */
  async deleteNote(noteId: string): Promise<any> {
    return await db
      .collection("notes")
      .doc(noteId)
      .delete()
      .then(() => {
        return { message: "Note successfully deleted" };
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  /**
   * @async
   * @function Share a note with a list of users
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
    const doc: DocumentSnapshot = await db
      .collection("users")
      .doc(userId)
      .get();

    if (!doc.exists) {
      throw new Error("No note with this id");
    }

    const userData: any = doc.data();

    return await db
      .collection("notes")
      .doc(noteId)
      .update({
        shared_to: usersList,
      })
      .then(async () => {
        await NotificationRepository.addShareNotifications(
          noteId,
          usersList,
          userData.name
        );

        return { message: "Note successfully shared" };
      })
      .catch((err: any) => {
        throw new Error(err.message);
      });
  }

  /**
   * @async
   * @function Get all notes shared with user
   * @param {string} uid ID of user whose shared notes to fetch
   * @returns {Promise}
   */
  async getSharedNotes(uid: string): Promise<NotesInterface[]> {
    const querySnapshot: QuerySnapshot = await db
      .collection("notes")
      .where("shared_to", "array-contains", uid)
      .get();

    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot): NotesInterface => {
        return doc.data() as NotesInterface;
      }
    );
  }
}

export default new NotesRepository();
