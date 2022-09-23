import CommentsRepository from "../repository/commentsRepository";

const getAll = async (noteID: string) => {
  try {
    return await CommentsRepository.getAll(noteID);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const addComment = async (
  noteID: string,
  userID: string,
  userName: string,
  content: string
) => {
  try {
    return await CommentsRepository.addComment(
      noteID,
      userID,
      userName,
      content
    );
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const deleteComment = async (
  noteID: string,
  commentID: string,
  userID: string
) => {
  try {
    return await CommentsRepository.deleteComment(noteID, commentID, userID);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const updateComment = async (
  noteID: string,
  commentID: string,
  userID: string,
  content: string
) => {
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
};

export default {
  getAll,
  addComment,
  deleteComment,
  updateComment,
};
