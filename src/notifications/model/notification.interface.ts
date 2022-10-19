export interface NotificationInterface {
  notification_id: string;
  message: string;
  type: string;
  note_id: string;
  is_read: boolean;
  time_created: number;
  time_read: number;
}
