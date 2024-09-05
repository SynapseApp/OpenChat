import { Request, Response } from "express";
import Message from "../models/message.model";
import response from "../utils/response";
import { io } from "../server";
import Room from "../models/room.model";

const getMessages = (req: Request, res: Response) => {
  Message.find(req.query)
    .exec()
    .then((messages) => res.send(response("Messages fetched", true, messages)))
    .catch((err) => res.send(response(err)));
};

const postMessage = (req: Request, res: Response) => {
  Message.create(req.body)
    .then((message) => {
      io.emit(message.room + "/incoming-message", message);
      res.send(response("Message created", true, message));
    })
    .catch((err) => res.send(err));
};

export default {
  getMessages,
  postMessage,
};
