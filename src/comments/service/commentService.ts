import CommentsRepository from "../repository/commentsRepository";

class CommentService {
  /**
   * Get all comments for a note
   * @param {string} noteID Note ID
   * @returns {Promise<any>}
   */
  async getAll(noteID: string): Promise<any> {
    try {
      return await CommentsRepository.getAll(noteID);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Add a comment to a note
   * @param {sring} noteID Note ID
   * @param {sring} noteAuthorID Note author ID
   * @param {sring} userID User ID
   * @param {sring} userName User name
   * @param {sring} content Comment body
   * @returns {Promise<any>}
   */
  async addComment(
    noteID: string,
    noteAuthorID: string,
    userID: string,
    userName: string,
    content: string
  ): Promise<any> {
    try {
      return await CommentsRepository.addComment(
        noteID,
        noteAuthorID,
        userID,
        userName,
        content
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Delete a comment
   * @param {string} noteID Note ID
   * @param {string} commentID Comment ID
   * @param {string} userID User ID
   * @returns {Promise<any>}
   */
  async deleteComment(
    noteID: string,
    commentID: string,
    userID: string
  ): Promise<any> {
    try {
      return await CommentsRepository.deleteComment(noteID, commentID, userID);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Update a comment
   * @param {string} noteID Note ID
   * @param {string} commentID Comment ID
   * @param {string} userID User ID
   * @param {string} content Comment body
   * @returns {Promise<any>}
   */
  async updateComment(
    noteID: string,
    commentID: string,
    userID: string,
    content: string
  ): Promise<any> {
    try {
      return await CommentsRepository.updateComment(
        noteID,
        commentID,
        userID,
        content
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default new CommentService();
