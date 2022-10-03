import { Request, Response } from "express";
import UsersService from "../service/usersService";

class UsersController {
  /**
   * @route GET api/users
   * @description Get all users
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UsersService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * @route GET api/user/:id
   * @description Get a single user by id
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async getUser(req: Request, res: Response): Promise<void> {
    const uid: string = req.params.id;
    try {
      const users = await UsersService.getUser(uid);
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  /**
   * @route PUT api/user
   * @description Create a new user
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async create(req: Request, res: Response): Promise<void> {
    const { uid, name, email } = req.body;
    try {
      const result = await UsersService.createUser(uid, name, email);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }
}

export default new UsersController();
