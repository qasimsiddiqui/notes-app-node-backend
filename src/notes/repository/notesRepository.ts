import db from "../../firebase";
import * as NotificationRepository from "../../notifications/repository/notifications.repository";

const getAllNotes = async (uid: string) => {
  const querySnapshot = await db
    .collection("notes")
    .where("author_id", "==", uid)
    .get();
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};

const getSingleNote = async (noteID: string, uid: string) => {
  const doc = await db.collection("notes").doc(noteID).get();

  if (!doc.exists) {
    throw new Error("Note not found");
  }

  const note: any = doc.data();

  if (note.author_id !== uid && !note.shared_to.includes(uid)) {
    throw new Error("You are not authorized to view this note");
  }

  return note;
};

const createNote = async (
  body: string,
  author_id: string,
  author_name: string
) => {
  const documentReference = await db.collection("notes").doc();
  return await documentReference
    .set({
      id: documentReference.id,
      body,
      author_id,
      author_name,
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
};

const updateNote = async (noteID: string, body: string) => {
  const doc = await db.collection("notes").doc(noteID).get();

  if (!doc.exists) {
    return { error: "No note with this id" };
  }
  return await doc.ref
    .update({ body: body, time_updated: Date.now(), isEdited: true })
    .then(() => {
      return { message: "Data updated" };
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const deleteNote = async (noteID: string) => {
  return await db
    .collection("notes")
    .doc(noteID)
    .delete()
    .then(() => {
      return { message: "Note successfully deleted" };
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const shareNote = async (
  noteID: string,
  usersList: [string],
  userID: string
) => {
  const doc: any = (await db.collection("users").doc(userID).get()).data();

  return await db
    .collection("notes")
    .doc(noteID)
    .update({
      shared_to: usersList,
    })
    .then(async () => {
      await NotificationRepository.addShareNotifications(
        noteID,
        usersList,
        doc.name
      );

      return { message: "Note successfully shared" };
    })
    .catch((err: any) => {
      throw new Error(err.message);
    });
};

const getSharedNotes = async (uid: string) => {
  const querySnapshot = await db
    .collection("notes")
    .where("shared_to", "array-contains", uid)
    .get();
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
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
