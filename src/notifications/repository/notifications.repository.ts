import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import db from "../../firebase";
import { NotificationInterface } from "../model/notification.model";

/**
 * Get all unread notifications for a user
 * @param {string} uid User ID
 * @returns {Promise<NotificationInterface[]>} Array of notifications
 */
export async function getAll(uid: string): Promise<NotificationInterface[]> {
  try {
    const querySnapshot: QuerySnapshot = await db
      .collection(`users/${uid}/notifications`)
      .where("is_read", "==", false)
      .orderBy("time_created", "desc")
      .get();
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot): NotificationInterface => {
        return doc.data() as NotificationInterface;
      }
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
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
  try {
    const doc = await db
      .collection(`users/${uid}/notifications`)
      .doc(NotificationId)
      .get();

    if (!doc.exists) {
      return { error: "No notification with this id" };
    }

    return await doc.ref
      .update({
        is_read: true,
        time_read: Date.now(),
      })
      .then(() => {
        return { message: "Notification marked as read" };
      })
      .catch((err) => {
        throw new Error(err.message);
      });
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
    const docRef = await db.collection(`users/${userId}/notifications`).doc();

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
  } catch (error: any) {
    throw new Error(error.message);
  }
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
  users: any,
  userName: string
): Promise<any> {
  try {
    // Create batch to perform multiple writes as a single operation.
    const batch: FirebaseFirestore.WriteBatch = db.batch();

    users.forEach((user: any) => {
      const docRef = db.collection(`users/${user}/notifications`).doc();
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
    return await batch.commit().then(() => {
      return { message: "Notifications sent users" };
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Mark all notifications as read
 * @param {string} uid User ID
 * @returns {Promise<any>}
 */
export async function markAllAsRead(uid: string): Promise<any> {
  try {
    const querySnapshot = await db
      .collection(`users/${uid}/notifications`)
      .where("is_read", "==", false)
      .get();

    if (querySnapshot.empty) {
      return { error: "No notifications to mark as read" };
    }

    // Create batch to perform multiple writes as a single operation.
    const batch: FirebaseFirestore.WriteBatch = db.batch();

    querySnapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        is_read: true,
        time_read: Date.now(),
      });
    });

    // Commit the batch
    return await batch.commit().then(() => {
      return { message: "All notifications marked as read" };
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
