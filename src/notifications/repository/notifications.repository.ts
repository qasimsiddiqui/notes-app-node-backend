import db from "../../firebase";

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
