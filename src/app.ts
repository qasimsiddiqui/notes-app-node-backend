import express, { Application, Request, Response } from "express";
import notesRoutes from "./notes/notes.routes";
import userRoutes from "./users/userRoutes";
import commentRoutes from "./comments/commentRoutes";
import notificationsRoutes from "./notifications/notifications.routes";

const cors = require("cors");
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/v1/api/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

app.use("/v1/api/", notesRoutes);
app.use("/v1/api/", userRoutes);
app.use("/v1/api/", commentRoutes);
app.use("/v1/api/", notificationsRoutes);

try {
  app.listen(4000, (): void => {
    console.log(`Connected successfully on port ${4000}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
