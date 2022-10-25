/**
 * @swagger
 * components:
 *   schemas:
 *      Note:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the note
 *          body:
 *            type: string
 *            description: The body of the note
 *          time_created:
 *            type: number
 *            description: The time the note was created (in milliseconds elapsed since Epoch)
 *          time_updated:
 *            type: number
 *            description: The time the note was updated (in milliseconds elapsed since Epoch)
 *          time_deleted:
 *            type: number | null
 *            description: The time the note was deleted (in milliseconds elapsed since Epoch)
 *          isEdited:
 *            type: boolean
 *            description: Whether the note has been edited
 *          shared_to:
 *            type: string[]
 *            description: The users that the note is shared to
 *          author_id:
 *            type: string
 *            description: The id of the user that created the note
 *          author_name:
 *            type: string
 *            description: The name of the user that created the note
 */

export interface NotesInterface {
  id: string;
  body: string;
  time_created: number;
  time_updated: number;
  time_deleted: number | null;
  is_edited: boolean;
  shared_to: string[];
  author_id: string;
  author_name: string;
}
