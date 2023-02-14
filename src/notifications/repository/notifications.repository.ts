import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteResult,
} from "firebase-admin/firestore";
import db from "../../firebase";
import {
  USERS_COLLECTION,
  NOTIFICATIONS_COLLECTION,
} from "../../constants/collection.constants";
import { NotificationInterface } from "../model/notification.interface";
import { NotificationClass } from "../model/notification.model";

/**
 * Get all unread notifications for a user
 * @param {string} uid User ID
 * @returns {Promise<NotificationInterface[]>} Array of notifications
 */
export async function getAll(uid: string): Promise<NotificationInterface[]> {
  // Get all unread notifications for a user
  const querySnapshot: QuerySnapshot = await db
    .collection(`${USERS_COLLECTION}/${uid}/${NOTIFICATIONS_COLLECTION}`)
    .where(NotificationClass.fieldNameisRead(), "==", false)
    .orderBy(NotificationClass.fieldNameTimeCreated(), "desc")
    .get();

  return querySnapshot.docs.map(
    (doc: QueryDocumentSnapshot): NotificationInterface => {
      return doc.data() as NotificationInterface;
    }
  );
}

/**
 * Mark Notification as Read
 * @param {string} uid User ID
 * @param {String} NotificationId Notification ID to mark as read
 * @returns {Promise<any>}
 */
export async function markAsRead(
  uid: string,
  NotificationId: string
): Promise<any> {
  // Get the notification
  const doc = await db
    .collection(`${USERS_COLLECTION}/${uid}/${NOTIFICATIONS_COLLECTION}`)
    .doc(NotificationId)
    .get();

  // Check if notification exists
  if (!doc.exists) {
    return { error: "No notification with this id" };
  }

  // Update the notification
  const result: WriteResult = await doc.ref.update({
    is_read: true,
    time_read: Date.now(),
  });

  if (result.writeTime) {
    return { message: "Notification successfully marked as read" };
  } else {
    return { error: "Error marking notification as read" };
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
  const docRef = db
    .collection(`${USERS_COLLECTION}/${userId}/${NOTIFICATIONS_COLLECTION}`)
    .doc();

  const message = `${userName} commented on your note`;

  await docRef.set({
    notification_id: docRef.id,
    note_id: noteId,
    message,
    type: "comment",
    is_read: false,
    time_created: Date.now(),
    time_read: Date.now(),
  });

  return { message: "Notification successfully added" };
}

/**
 * Add Notification on Share of note
 * @param {string} noteId Note id of the note that was shared
 * @param {string} users Array of user ids that the note was shared to
 * @param {string} userName Name of the user that shared the note
 * @returns {Promise<any>}
 */
export async function addShareNotifications(
  noteId: string,
  users: string[],
  userName: string
): Promise<any> {
  // Create batch to perform multiple writes as a single operation.
  const batch: FirebaseFirestore.WriteBatch = db.batch();

  users.forEach((user: string) => {
    const docRef = db
      .collection(`${USERS_COLLECTION}/${user}/${NOTIFICATIONS_COLLECTION}`)
      .doc();
    batch.create(docRef, {
      notification_id: docRef.id,
      note_id: noteId,
      message: `${userName} shared a note with you`,
      type: "share",
      is_read: false,
      time_created: Date.now(),
      time_read: Date.now(),
    });
  });

  // Commit the batch
  const result: WriteResult[] = await batch.commit();
  if (result.length > 0) {
    return { message: "Notifications successfully sent to users" };
  } else {
    throw new Error("Error adding notifications");
  }
}

/**
 * Mark all notifications as read
 * @param {string} uid User ID
 * @returns {Promise<any>}
 */
export async function markAllAsRead(uid: string): Promise<any> {
  const querySnapshot = await db
    .collection(`${USERS_COLLECTION}/${uid}/${NOTIFICATIONS_COLLECTION}`)
    .where(NotificationClass.fieldNameisRead(), "==", false)
    .get();

  // No notification to mark as read
  if (querySnapshot.empty) {
    return { error: "No notifications to mark as read" };
  }

  // Create batch to perform multiple writes as a single operation.
  const batch: FirebaseFirestore.WriteBatch = db.batch();

  // Mark notifications as read
  querySnapshot.docs.forEach((doc) => {
    batch.update(doc.ref, {
      is_read: true,
      time_read: Date.now(),
    });
  });

  // Commit the batch
  const result: WriteResult[] = await batch.commit();

  if (result.length > 0) {
    return { message: "All notifications successfully marked as read" };
  } else {
    throw new Error("Error marking notifications as read");
  }
}
