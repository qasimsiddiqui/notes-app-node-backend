import db from "../../firebase";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteResult,
} from "firebase-admin/firestore";
import { UserInterface } from "../model/users.interface";
import { USERS_COLLECTION } from "../../constants/collection.constants";

class UsersRepository {
  /**
   * Get all users
   * @returns {Promise<UserInterface[]>}
   */
  async getAllUsers(): Promise<UserInterface[]> {
    const querySnapshot: QuerySnapshot = await db
      .collection(USERS_COLLECTION)
      .get();
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot): UserInterface => {
        return doc.data() as UserInterface;
      }
    );
  }

  /**
   * Get a single user by id
   * @param {string} uid ID of user to be retrieved
   * @returns {Promise<UserInterface>} user
   */
  async getUser(uid: string): Promise<UserInterface> {
    const doc: DocumentSnapshot = await db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .get();

    // Check if user exists
    if (!doc.exists) {
      throw new Error("User not found");
    }

    const user: UserInterface = doc.data() as UserInterface;

    return user;
  }

  /**
   * Create a new user
   * @param {string} uid ID of user
   * @param {string} name  Name of user
   * @param {string} email Email of user
   * @returns {Promise<any>}
   */
  async createUser(uid: string, name: string, email: string): Promise<any> {
    const result: WriteResult = await db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .set({
        id: uid,
        name,
        email,
        created_at: Date.now(),
        updated_at: Date.now(),
      });

    if (result.writeTime) {
      return { message: "New User added" };
    } else {
      throw new Error("Error creating user");
    }
  }
}

export default new UsersRepository();
