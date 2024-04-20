import { Router } from "express";
import roomController from "../controllers/room.controller";

const roomRouter = Router();

roomRouter.get("/", roomController.getRooms);
roomRouter.post("/", roomController.postRoom);
roomRouter.get("/:id", roomController.getRoom);

export default roomRouter;
