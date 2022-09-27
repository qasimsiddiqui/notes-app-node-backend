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

  async getUser(req: Request, res: Response) {
    const uid: string = req.params.id;
    try {
      const users = await UsersService.getUser(uid);
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }

  async create(req: Request, res: Response) {
    const { id, name, email } = req.body;
    try {
      const result = await UsersService.createUser(id, name, email);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }
}

export default new UsersController();
