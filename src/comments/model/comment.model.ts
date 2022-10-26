/**
 * @swagger
 * components:
 *   schemas:
 *      Comment:
 *        type: object
 *        properties:
 *          comment_id:
 *            type: string
 *            description: The auto-generated id of the comment
 *          content:
 *            type: string
 *            description: The content of the comment
 *          time_created:
 *            type: number
 *            description: The time the comment was made (in milliseconds elapsed since Epoch)
 *          time_updated:
 *            type: number
 *            description: The time the comment was updated (in milliseconds elapsed since Epoch)
 *          is_edited:
 *            type: boolean
 *            description: Whether the comment has been edited
 *          author_id:
 *            type: string
 *            description: The id of the user that created the comment
 *          author_name:
 *            type: string
 *            description: The name of the user that created the comment
 */

export interface CommentInterface {
  author_id: string;
  author_name: string;
  comment_id: string;
  content: string;
  is_edited: boolean;
  time_created: number;
  time_updated: number;
}
