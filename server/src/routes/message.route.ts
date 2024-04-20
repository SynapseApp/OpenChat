import { Router } from "express";
import messageController from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get("/", messageController.getMessages);
messageRouter.post("/", messageController.postMessage);

export default messageRouter;
