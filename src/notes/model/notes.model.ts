import { NotesInterface } from "./notes.interface";

export class NotesClass implements NotesInterface {
  readonly id: string;
  readonly body: string;
  readonly time_created: number;
  readonly time_updated: number;
  readonly time_deleted: number | null;
  readonly is_edited: boolean;
  readonly shared_to: string[];
  readonly author_id: string;
  readonly author_name: string;

  constructor(
    id: string,
    body: string,
    author_id: string,
    author_name: string,
    time_created: number,
    time_updated: number,
    time_deleted: number | null,
    is_edited: boolean,
    shared_to: string[]
  ) {
    this.id = id;
    this.body = body;
    this.time_created = time_created;
    this.time_updated = time_updated;
    this.time_deleted = time_deleted;
    this.is_edited = is_edited;
    this.shared_to = shared_to;
    this.author_id = author_id;
    this.author_name = author_name;
  }

  public static fieldNameId(): string {
    return "id";
  }
  public static fieldNameBody(): string {
    return "body";
  }
  public static fieldNameTimeCreated(): string {
    return "time_created";
  }
  public static fieldNameTimeUpdated(): string {
    return "time_updated";
  }
  public static fieldNameTimeDeleted(): string {
    return "time_deleted";
  }
  public static fieldNameIsEdited(): string {
    return "is_edited";
  }
  public static fieldNameSharedTo(): string {
    return "shared_to";
  }
  public static fieldNameAuthorID(): string {
    return "author_id";
  }
  public static fieldNameAuthorName(): string {
    return "author_name";
  }
}
