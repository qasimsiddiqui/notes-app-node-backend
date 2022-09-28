import db from "../../firebase";

/**
 * Get all unread notifications for a user
 * @param uid
 * @returns
 */

export async function getAll(uid: string): Promise<any> {
  try {
    const querySnapshot = await db
      .collection(`users/${uid}/notifications`)
      .where("isRead", "==", false)
      .orderBy("time_created", "desc")
      .get();
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error: any) {
    throw new Error(error.message);
  }
}
/**
 * Mark Notification as Read
 * @param uid
 * @param NotificationID
 * @returns
 */
export async function markAsRead(uid: string, NotificationID: string) {
  try {
    const doc = await db
      .collection(`users/${uid}/notifications`)
      .doc(NotificationID)
      .get();

    if (!doc.exists) {
      return { error: "No notification with this id" };
    }

    return await doc.ref
      .update({
        isRead: true,
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
 * Add Notification
 * @param noteID
 * @param userID
 * @param userName
 * @param type
 */
export async function addNotification(
  noteID: string,
  userID: string,
  userName: string,
  type: string
) {
  try {
    const docRef = await db.collection(`users/${userID}/notifications`).doc();

    let message;
    if (type === "comment") {
      message = `${userName} commented on your note`;
    }
    if (type === "share") {
      message = `${userName} shared a note with you`;
    }

    await docRef.set({
      notification_id: docRef.id,
      note_id: noteID,
      message,
      type: "comment",
      isRead: false,
      time_created: Date.now(),
      time_read: Date.now(),
    });

    return { message: "Notification successfully added" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Mark all notifications as read
 * @param uid
 * @returns
 */
export async function markAllAsRead(uid: string) {
  try {
    const querySnapshot = await db
      .collection(`users/${uid}/notifications`)
      .where("isRead", "==", false)
      .get();

    if (querySnapshot.empty) {
      return { error: "No notifications to mark as read" };
    }

    // Create batch to perform multiple writes as a single operation.
    const batch: FirebaseFirestore.WriteBatch = db.batch();

    querySnapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        isRead: true,
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
