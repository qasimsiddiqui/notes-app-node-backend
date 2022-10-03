import CommentsRepository from "../repository/commentsRepository";

class CommentService {
  /**
   * Get all comments for a note
   * @param {string} noteId Note ID
   * @returns {Promise<any>}
   */
  async getAll(noteId: string): Promise<any> {
    try {
      return await CommentsRepository.getAll(noteId);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Add a comment to a note
   * @param {sring} noteId Note ID
   * @param {sring} noteAuthorId Note author ID
   * @param {sring} userId User ID
   * @param {sring} userName User name
   * @param {sring} content Comment body
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
      return await CommentsRepository.addComment(
        noteId,
        noteAuthorId,
        userId,
        userName,
        content
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Delete a comment
   * @param {string} noteId Note ID
   * @param {string} commentId Comment ID
   * @param {string} userId User ID
   * @returns {Promise<any>}
   */
  async deleteComment(
    noteId: string,
    commentId: string,
    userId: string
  ): Promise<any> {
    try {
      return await CommentsRepository.deleteComment(noteId, commentId, userId);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Update a comment
   * @param {string} noteId Note ID
   * @param {string} commentId Comment ID
   * @param {string} userId User ID
   * @param {string} content Comment body
   * @returns {Promise<any>}
   */
  async updateComment(
    noteId: string,
    commentId: string,
    userId: string,
    content: string
  ): Promise<any> {
    try {
      return await CommentsRepository.updateComment(
        noteId,
        commentId,
        userId,
        content
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default new CommentService();
