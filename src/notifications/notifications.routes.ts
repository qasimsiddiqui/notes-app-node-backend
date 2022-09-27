import { Router } from "express";
import { middleware } from "../utils/authService";
import * as NotificationsController from "./controller/notifications.controller";

const router = Router();

function notificationRoutes() {
  router
    .route("/notifications")
    .get(middleware, NotificationsController.getAll);
  router
    .route("/notification/:id")
    .post(middleware, NotificationsController.markAsRead);
  return router;
}

export default notificationRoutes();
