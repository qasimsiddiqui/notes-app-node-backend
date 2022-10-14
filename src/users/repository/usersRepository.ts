import db from "../../firebase";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";
import { UserInterface } from "../model/users.model";

/**
 * Get all users
 * @returns {Promise<UserInterface[]>}
 */
const getAllUsers = async (): Promise<UserInterface[]> => {
  const querySnapshot: QuerySnapshot = await db.collection("users").get();
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot): UserInterface => {
    return doc.data() as UserInterface;
  });
};

/**
 * Get a single user by id
 * @param {string} uid ID of user to be retrieved
 * @returns {Promise<UserInterface>} user
 */
const getUser = async (uid: string): Promise<UserInterface> => {
  return await db
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        throw new Error("No user with this id");
      }
      return doc.data() as UserInterface;
    });
};

/**
 * Create a new user
 * @param {string} uid ID of user
 * @param {string} name  Name of user
 * @param {string} email Email of user
 * @returns {Promise<any>}
 */
const createUser = async (
  uid: string,
  name: string,
  email: string
): Promise<any> => {
  return await db
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
  getUser,
  createUser,
};
