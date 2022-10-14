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
 * @param {string} NotificationID Notification ID to mark as read
 * @returns {Promise<any>}
 */
export async function markAsRead(
  uid: string,
  NotificationID: string
): Promise<any> {
  try {
    return await NotificationRepository.markAsRead(uid, NotificationID);
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
