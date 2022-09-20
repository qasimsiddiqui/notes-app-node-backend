import db from "../../firebase";

const getAllUsers = async () => {
  const querySnapshot = await db.collection("users").get();
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
};

const createUser = async (uid: string, name: string, email: string) => {
  const documentReference = await db
    .collection("users")
    .doc(uid)
    .set({
      id: uid,
      name,
      email,
      created_at: Date.now(),
      updated_at: Date.now(),
    })
    .then(() => {
      return { message: "New User added" };
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export default {
  getAllUsers,
  createUser,
};
