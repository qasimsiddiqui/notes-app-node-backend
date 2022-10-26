import { CommentInterface } from "./comment.interface";

export class CommentClass implements CommentInterface {
  author_id: string;
  author_name: string;
  comment_id: string;
  content: string;
  is_edited: boolean;
  time_created: number;
  time_updated: number;

  constructor(comment?: CommentInterface) {
    this.author_id = comment?.author_id ?? "";
    this.author_name = comment?.author_name ?? "";
    this.comment_id = comment?.comment_id ?? "";
    this.content = comment?.content ?? "";
    this.is_edited = comment?.is_edited ?? false;
    this.time_created = comment?.time_created ?? Date.now();
    this.time_updated = comment?.time_updated ?? Date.now();
  }

  public updateData(content: string): void {
    this.content = content;
    this.is_edited = true;
    this.time_updated = Date.now();
  }

  public getMap() {
    return {
      comment_id: this.comment_id,
      content: this.content,
      author_id: this.author_id,
      author_name: this.author_name,
      is_edited: this.is_edited,
      time_created: this.time_created,
      time_updated: this.time_updated,
    };
  }

  public setCommentId(value: string) {
    this.comment_id = value;
  }
  public setContent(value: string) {
    this.content = value;
  }
  public setAuthorId(value: string) {
    this.author_id = value;
  }
  public setAuthorName(value: string) {
    this.author_name = value;
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
