import { Request, Response } from "express";
import UsersService from "../service/usersService";

class UsersController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await UsersService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async create(req: Request, res: Response) {
    const { uid, name, email }: any = req.body;
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
