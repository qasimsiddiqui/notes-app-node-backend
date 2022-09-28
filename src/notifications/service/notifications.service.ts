import * as NotificationRepository from "../repository/notifications.repository";

export async function getAll(uid: string) {
  try {
    return await NotificationRepository.getAll(uid);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function markAsRead(uid: string, NotificationID: string) {
  try {
    return await NotificationRepository.markAsRead(uid, NotificationID);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Mark all notifications as read service
 * @param uid User ID
 */
export async function markAllAsRead(uid: string) {
  try {
    return await NotificationRepository.markAllAsRead(uid);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
