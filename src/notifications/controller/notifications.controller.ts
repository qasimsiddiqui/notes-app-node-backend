import { Request, Response } from "express";
import * as NotificationsService from "../service/notifications.service";

/**
 * @route  GET /notifications
 * @description Get All unread Notifications
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const result = await NotificationsService.getAll(res.locals.uid);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
}

/**
 * @route  POST /notification/:id
 * @description Mark All Notifications as Read
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function markAsRead(req: Request, res: Response): Promise<void> {
  const uid = res.locals.uid;
  const NotificationId = req.params.id;
  try {
    const result = await NotificationsService.markAsRead(uid, NotificationId);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
}

/**
 * @route  POST /notifications/markAllAsRead
 * @description Mark all notifications as read
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns {Promise<void>}
 */
export async function markAllAsRead(
  req: Request,
  res: Response
): Promise<void> {
  const uid = res.locals.uid;
  try {
    const result = await NotificationsService.markAllAsRead(uid);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
}
