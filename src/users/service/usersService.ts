import { UserInterface } from "../model/users.model";
import UsersRepository from "../repository/usersRepository";

class UsersService {
  /**
   * Get all users
   * @returns {Promise<UserInterface[]>}
   */
  async getAllUsers(): Promise<UserInterface[]> {
    try {
      return await UsersRepository.getAllUsers();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Get a single user by id
   * @param {string} uid ID of user to be retrieved
   * @returns {Promise<UserInterface>} user
   */
  async getUser(uid: string): Promise<UserInterface> {
    try {
      return await UsersRepository.getUser(uid);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   * Create a new user
   * @param uid ID of user
   * @param name Name of user
   * @param email Email of user
   * @returns {Promise<any>}
   */
  async createUser(uid: string, name: string, email: string): Promise<any> {
    try {
      return await UsersRepository.createUser(uid, name, email);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**
   *
   *
   */
  async getSharedListDetails(users: string[]) {
    try {
      return await UsersRepository.getSharedListDetails(users);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default new UsersService();
