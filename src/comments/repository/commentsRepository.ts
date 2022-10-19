import {
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
  WriteResult,
} from "firebase-admin/firestore";
import db from "../../firebase";
import {
  NOTES_COLLECTION,
  COMMENTS_COLLECTION,
} from "../../constants/collection.constants";
import * as NotificationRepository from "../../notifications/repository/notifications.repository";
import { CommentInterface } from "../model/comment.model";

class NotesRepository {
  /**
   * Get all comments for a note
   * @param {string} noteId Note ID
   * @returns {Promise<CommentInterface[]>}
   */
  async getAll(noteId: string): Promise<CommentInterface[]> {
    const querySnapshot: QuerySnapshot = await db
      .collection(`${NOTES_COLLECTION}/${noteId}/${COMMENTS_COLLECTION}`)
      .orderBy("time_created")
      .get();
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot): CommentInterface => {
        return doc.data() as CommentInterface;
      }
    );
  }

  /**
   * Add a comment to a note
   * @param noteId Note ID
   * @param noteAuthorId Note author user ID
   * @param userId User ID
   * @param userName User name
   * @param content Comment body
   * @returns {Promise<any>}
   */
  async addComment(
    noteId: string,
    noteAuthorId: string,
    userId: string,
    userName: string,
    content: string
  ): Promise<any> {
    try {
      const commentDocRef: DocumentReference = db
        .collection(`${NOTES_COLLECTION}/${noteId}/${COMMENTS_COLLECTION}`)
        .doc();
      await commentDocRef.set({
        comment_id: commentDocRef.id,
        content,
        author_id: userId,
        author_name: userName,
        is_edited: false,
        time_created: Date.now(),
        time_updated: Date.now(),
      });

      return { message: "Comment successfully added" };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Delete a comment
   * @param noteId  Note ID
   * @param commentId Comment ID
   * @param userId User ID
   * @returns {Promise<any>}
   */
  async deleteComment(
    noteId: string,
    commentId: string,
    userId: string
  ): Promise<any> {
    // Get comment
    const doc: DocumentData = await db
      .collection(`${NOTES_COLLECTION}/${noteId}/${COMMENTS_COLLECTION}`)
      .doc(commentId)
      .get();

    // Check if comment exists
    if (!doc.exists) {
      throw new Error("Comment does not exist");
    }

    const comment: CommentInterface = doc.data() as CommentInterface;

    // Check if comment was created by user
    if (comment.author_id !== userId) {
      throw new Error("You are not authorized to delete this comment.");
    }

    const result: WriteResult = await db
      .collection(`${NOTES_COLLECTION}/${noteId}/${COMMENTS_COLLECTION}`)
      .doc(commentId)
      .delete();

    if (result.writeTime) {
      return { message: "Comment successfully deleted" };
    } else {
      throw new Error("Error deleting comment");
    }
  }

  /**
   * Update a comment
   * @param noteId Note ID
   * @param commentId Comment ID
   * @param userId User ID
   * @param content Comment body
   * @returns {Promise<any>}
   */
  async updateComment(
    noteId: string,
    commentId: string,
    userId: string,
    content: string
  ): Promise<any> {
    // Get comment
    const doc: DocumentData = await db
      .collection(`${NOTES_COLLECTION}/${noteId}/${COMMENTS_COLLECTION}`)
      .doc(commentId)
      .get();

    // Check if comment exists
    if (!doc.exists) {
      throw new Error("Comment does not exist");
    }

    const comment: CommentInterface = doc.data() as CommentInterface;

    // Check if comment was created by user
    if (comment.author_id !== userId) {
      throw new Error("You are not authorized to edit this comment");
    }

    const result: WriteResult = await db
      .collection(`${NOTES_COLLECTION}/${noteId}/${COMMENTS_COLLECTION}`)
      .doc(commentId)
      .update({
        content,
        is_edited: true,
        time_updated: Date.now(),
      });

    if (result.writeTime) {
      return { message: "Comment successfully updated" };
    } else {
      throw new Error("Error updating comment");
    }
  }
}

export default new NotesRepository();
