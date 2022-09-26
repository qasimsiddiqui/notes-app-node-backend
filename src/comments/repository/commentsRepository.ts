import db from "../../firebase";

const getAll = async (noteID: string) => {
  const querySnapshot = await db
    .collection(`notes/${noteID}/comments`)
    .orderBy("time_created")
    .get();
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};

const addComment = async (
  noteID: string,
  userID: string,
  userName: string,
  content: string
) => {
  const documentReference = await db
    .collection(`notes/${noteID}/comments`)
    .doc();
  return await documentReference
    .set({
      comment_id: documentReference.id,
      content,
      author_id: userID,
      author_name: userName,
      time_created: Date.now(),
      time_updated: Date.now(),
    })
    .then(() => {
      return { message: "New Comment added" };
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const deleteComment = async (
  noteID: string,
  commentID: string,
  userID: string
) => {
  let doc: any = await db
    .collection(`notes/${noteID}/comments`)
    .doc(commentID)
    .get();

  doc = doc.data();

  if (doc.author_id === userID) {
    return await db
      .collection(`notes/${noteID}/comments`)
      .doc(commentID)
      .delete()
      .then(() => {
        return { message: "Comment successfully deleted" };
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } else {
    return { message: "Comment not created by you." };
  }
};

const updateComment = async (
  noteID: string,
  commentID: string,
  userID: string,
  content: string
) => {
  let doc: any = await db
    .collection(`notes/${noteID}/comments`)
    .doc(commentID)
    .get();

  doc = doc.data();

  if (doc.author_id === userID) {
    return await db
      .collection(`notes/${noteID}/comments`)
      .doc(commentID)
      .update({
        content,
        time_updated: Date.now(),
      })
      .then(() => {
        return { message: "Comment successfully updated" };
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } else {
    return { message: "Comment not created by you." };
  }
};

export default {
  getAll,
  addComment,
  deleteComment,
  updateComment,
};
