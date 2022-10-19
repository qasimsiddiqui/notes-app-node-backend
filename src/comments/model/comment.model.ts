import { CommentInterface } from "./comment.interface";

export class CommentClass implements CommentInterface {
  author_id: string;
  author_name: string;
  comment_id: string;
  content: string;
  is_edited: boolean;
  time_created: number;
  time_updated: number;

  constructor(
    author_id: string,
    author_name: string,
    comment_id: string,
    content: string,
    is_edited: boolean,
    time_created: number,
    time_updated: number
  ) {
    this.author_id = author_id;
    this.author_name = author_name;
    this.comment_id = comment_id;
    this.content = content;
    this.is_edited = is_edited;
    this.time_created = time_created;
    this.time_updated = time_updated;
  }

  public static fieldNameAuthorId(): string {
    return "author_id";
  }
  public static fieldNameAuthorName(): string {
    return "author_name";
  }
  public static fieldNameCommentId(): string {
    return "comment_id";
  }
  public static fieldNameContent(): string {
    return "content";
  }
  public static fieldNameIsEdited(): string {
    return "is_edited";
  }
  public static fieldNameTimeCreated(): string {
    return "time_created";
  }
  public static fieldNameTimeUpdated(): string {
    return "time_updated";
  }
}
