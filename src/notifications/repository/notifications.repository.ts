import db from "../../firebase";

export async function getAll(uid: string): Promise<any> {
  try {
    const querySnapshot = await db
      .collection(`users/${uid}/notifications`)
      .orderBy("created_at", "desc")
      .get();
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function markAsRead(uid: string) {
  try {
    const querySnapshot = await db
      .collection(`users/${uid}/notifications`)
      .where("isRead", "==", false)
      .get();
    querySnapshot.forEach(async (doc) => {
      await doc.ref.update({ isRead: true });
    });

    return { message: "All notifications marked as read" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
