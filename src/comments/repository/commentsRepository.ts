import db from "../../firebase";
import * as NotificationRepository from "../../notifications/repository/notifications.repository";

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
  noteAuthorID: string,
  userID: string,
  userName: string,
  content: string
) => {
  try {
    const commentDocRef = await db.collection(`notes/${noteID}/comments`).doc();
    await commentDocRef.set({
      comment_id: commentDocRef.id,
      content,
      author_id: userID,
      author_name: userName,
      isEdited: false,
      time_created: Date.now(),
      time_updated: Date.now(),
    });

    if (noteAuthorID !== userID) {
      await NotificationRepository.addNotification(
        noteID,
        noteAuthorID,
        userName,
        "comment"
      );
    }
    return { message: "Comment successfully added" };
  } catch (error: any) {
    throw new Error(error.message);
  }
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
        isEdited: true,
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
