import {
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase-admin/firestore";
import db from "../../firebase";
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
      .collection(`notes/${noteId}/comments`)
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
      const commentDocRef: DocumentReference = await db
        .collection(`notes/${noteId}/comments`)
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

      if (noteAuthorId !== userId) {
        await NotificationRepository.addCommentNotification(
          noteId,
          noteAuthorId,
          userName
        );
      }
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
    const doc: DocumentData = await db
      .collection(`notes/${noteId}/comments`)
      .doc(commentId)
      .get();

    const comment: CommentInterface = doc.data() as CommentInterface;

    if (comment.author_id === userId) {
      return await db
        .collection(`notes/${noteId}/comments`)
        .doc(commentId)
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
    const doc: DocumentData = await db
      .collection(`notes/${noteId}/comments`)
      .doc(commentId)
      .get();

    const comment: CommentInterface = doc.data() as CommentInterface;

    if (comment.author_id === userId) {
      return await db
        .collection(`notes/${noteId}/comments`)
        .doc(commentId)
        .update({
          content,
          is_edited: true,
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
  }
}

export default new NotesRepository();
