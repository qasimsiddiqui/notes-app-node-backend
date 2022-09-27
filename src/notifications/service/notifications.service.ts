import * as NotificationRepository from "../repository/notifications.repository";

export async function getAll(uid: string) {
  try {
    return await NotificationRepository.getAll(uid);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function mark(uid: string) {
  try {
    return await NotificationRepository.markAsRead(uid);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
