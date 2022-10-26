import { NotificationInterface } from "./notification.interface";

export class NotificationClass implements NotificationInterface {
  notification_id: string;
  message: string;
  type: string;
  note_id: string;
  is_read: boolean;
  time_created: number;
  time_read: number;

  constructor(
    notification_id: string,
    message: string,
    type: string,
    note_id: string,
    is_read: boolean,
    time_created: number,
    time_read: number
  ) {
    this.notification_id = notification_id;
    this.message = message;
    this.type = type;
    this.note_id = note_id;
    this.is_read = is_read;
    this.time_created = time_created;
    this.time_read = time_read;
  }

  public static fieldNameNotificationId(): string {
    return "notification_id";
  }
  public static fieldNameMessage(): string {
    return "message";
  }
  public static fieldNameType(): string {
    return "type";
  }
  public static fieldNameNoteId(): string {
    return "note_id";
  }
  public static fieldNameisRead(): string {
    return "is_read";
  }
  public static fieldNameTimeCreated(): string {
    return "time_created";
  }
  public static fieldNameTimeRead(): string {
    return "time_read";
  }
}
