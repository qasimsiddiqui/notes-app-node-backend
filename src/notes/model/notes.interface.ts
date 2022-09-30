export interface NotesInterface {
  id: string;
  body: string;
  time_created: number;
  time_updated: number;
  isEdited: boolean;
  shared_to: string[];
  author_id: string;
  author_name: string;
}
