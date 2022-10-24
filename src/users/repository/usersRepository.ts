import db from "../../firebase";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteResult,
} from "firebase-admin/firestore";
import { UserInterface } from "../model/users.model";
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
        return {
          id: doc.data()["id"],
          name: doc.data()["name"],
          email: doc.data()["email"],
          profile_picture: doc.data()["profile_picture"],
          created_at: doc.data()["created_at"],
          updated_at: doc.data()["updated_at"],
          has_token: doc.data()["refresh_token"] ? true : false,
        } as UserInterface;
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

    return {
      id: doc.data()!["id"],
      name: doc.data()!["name"],
      email: doc.data()!["email"],
      profile_picture: doc.data()!["profile_picture"],
      created_at: doc.data()!["created_at"],
      updated_at: doc.data()!["updated_at"],
      has_token: doc.data()!["refresh_token"] ? true : false,
    } as UserInterface;
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
        refresh_token: null,
      });

    if (result.writeTime) {
      return { message: "New User added" };
    } else {
      throw new Error("Error creating user");
    }
  }

  /**
   * Get details
   */
  async getSharedListDetails(users: string[]) {
    const querySnapshot: QuerySnapshot = await db
      .collection(USERS_COLLECTION)
      .where("id", "in", users)
      .get();
    return querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot): UserInterface => {
        return doc.data() as UserInterface;
      }
    );
  }

  /**
   * Update refresh token
   */
  async updateRefreshToken(refreshToken: string, uid: string) {
    const result: WriteResult = await db
      .collection(USERS_COLLECTION)
      .doc(uid)
      .update({
        refresh_token: refreshToken,
      });

    if (result.writeTime) {
      return { message: "Token added to user" };
    } else {
      throw new Error("Error updating token");
    }
  }
}

export default new UsersRepository();
