import { sendShareEmails } from "../../utils/gmail/email";
import * as NotificationRepository from "../repository/notifications.repository";

/**
 * Get All unread Notifications
 * @param {string} uid User ID
 * @returns
 */
export async function getAll(uid: string) {
  try {
    return await NotificationRepository.getAll(uid);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Mark Notification as Read
 * @param {string} uid User ID
 * @param {string} NotificationId Notification ID to mark as read
 * @returns {Promise<any>}
 */
export async function markAsRead(
  uid: string,
  NotificationId: string
): Promise<any> {
  try {
    return await NotificationRepository.markAsRead(uid, NotificationId);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Mark all notifications as read service
 * @param {string} uid User ID
 * @returns {Promise<any>}
 */
export async function markAllAsRead(uid: string): Promise<any> {
  try {
    return await NotificationRepository.markAllAsRead(uid);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Add Notification on Comment
 * @param {string} noteId Notification ID
 * @param {string} userId User ID
 * @param {string} userName User Name
 * @returns {Promise<any>}
 */
export async function addCommentNotification(
  noteId: string,
  userId: string,
  userName: string
): Promise<any> {
  try {
    return await NotificationRepository.addCommentNotification(
      noteId,
      userId,
      userName
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Add Notification on Comment
 * @param {string} noteId Notification ID
 * @param {string} users User IDs
 * @param {string} userName User Name
 * @returns {Promise<any>}
 */
export async function addShareNotification(
  noteId: string,
  users: string[],
  userName: string,
  uid: string
): Promise<any> {
  try {
    await NotificationRepository.addShareNotifications(noteId, users, userName);
    await sendShareEmails(uid, users, userName);
    return;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
