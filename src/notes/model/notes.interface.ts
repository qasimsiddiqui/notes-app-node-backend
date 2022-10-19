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

export const NOTES_COLLECTION = "notes";
