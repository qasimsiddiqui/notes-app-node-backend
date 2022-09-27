import { Request, Response } from "express";
import * as NotificationsService from "../service/notifications.service";

export async function getAll(req: Request, res: Response) {
  try {
    const result = NotificationsService.getAll(res.locals.uid);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
}

export async function markAsRead(req: Request, res: Response) {
  const uid = res.locals.uid;
  try {
    const result = NotificationsService.getAll(uid);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
}
