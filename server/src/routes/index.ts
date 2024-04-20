import { Express } from "express";
import userRouter from "./user.route";
import roomRouter from "./room.route";
import messageRouter from "./message.route";

export function initRoutes(app: Express) {
  app.use("/user", userRouter);
  app.use("/room", roomRouter);
  app.use("/message", messageRouter);

  app.use("*", (req, res) => res.status(404).send("UNREGISTERED ENDPOINT"));
}
