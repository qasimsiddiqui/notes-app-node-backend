import db from "../../firebase";

const getAllNotes = async (uid: string) => {
  const querySnapshot = await db
    .collection("notes")
    .where("author", "==", uid)
    .get();
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};

const getSingleNote = async (noteID: string) => {
  return await db
    .collection("notes")
    .doc(noteID)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return { error: "No note with this id" };
      }
      return doc.data();
    });
};

const createNote = async (body: string, author: string) => {
  const documentReference = await db.collection("notes").doc();
  return await documentReference
    .set({
      id: documentReference.id,
      body,
      author,
      time_created: Date.now(),
      time_updated: Date.now(),
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
    .update({ body: body })
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

export default {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
};
