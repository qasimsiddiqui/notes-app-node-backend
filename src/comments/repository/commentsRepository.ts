import {
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase-admin/firestore";
import db from "../../firebase";
import * as NotificationRepository from "../../notifications/repository/notifications.repository";
import { CommentInterface } from "../model/comment.model";

/**
 * Get all comments for a note
 * @param {string} noteID Note ID
 * @returns {Promise<CommentInterface[]>}
 */
const getAll = async (noteID: string) => {
  const querySnapshot: QuerySnapshot = await db
    .collection(`notes/${noteID}/comments`)
    .orderBy("time_created")
    .get();
  return querySnapshot.docs.map(
    (doc: QueryDocumentSnapshot): CommentInterface => {
      return doc.data() as CommentInterface;
    }
  );
};

/**
 * Add a comment to a note
 * @param noteID Note ID
 * @param noteAuthorID Note author user ID
 * @param userID User ID
 * @param userName User name
 * @param content Comment body
 * @returns {Promise<any>}
 */
const addComment = async (
  noteID: string,
  noteAuthorID: string,
  userID: string,
  userName: string,
  content: string
) => {
  try {
    const commentDocRef: DocumentReference = await db
      .collection(`notes/${noteID}/comments`)
      .doc();
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
      await NotificationRepository.addCommentNotification(
        noteID,
        noteAuthorID,
        userName
      );
    }
    return { message: "Comment successfully added" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Delete a comment
 * @param noteID  Note ID
 * @param commentID Comment ID
 * @param userID User ID
 * @returns {Promise<any>}
 */
const deleteComment = async (
  noteID: string,
  commentID: string,
  userID: string
) => {
  const doc: DocumentData = await db
    .collection(`notes/${noteID}/comments`)
    .doc(commentID)
    .get();

  const comment: CommentInterface = doc.data() as CommentInterface;

  if (comment.author_id === userID) {
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

/**
 * Update a comment
 * @param noteID Note ID
 * @param commentID Comment ID
 * @param userID User ID
 * @param content Comment body
 * @returns {Promise<any>}
 */
const updateComment = async (
  noteID: string,
  commentID: string,
  userID: string,
  content: string
) => {
  const doc: DocumentData = await db
    .collection(`notes/${noteID}/comments`)
    .doc(commentID)
    .get();

  const comment: CommentInterface = doc.data() as CommentInterface;

  if (comment.author_id === userID) {
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
