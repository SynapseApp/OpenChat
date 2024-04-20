import { Request, Response } from "express";
import Room from "../models/room.model";
import response from "../utils/response";

const getRooms = (req: Request, res: Response) => {
  Room.find()
    .then((room) =>
      res.status(200).send(response("Rooms fetched successfully", true, room))
    )
    .catch((err) => res.status(500).send(response(err)));
};

const postRoom = (req: Request, res: Response) => {
  const { users } = req.body;
  Room.create({ users })
    .then((room) =>
      res.status(200).send(response("Room created successfully", true, room))
    )
    .catch((err) => res.status(500).send(response(err)));
};

const getRoom = (req: Request, res: Response) => {
  const { id } = req.params;
  Room.findById(id)
    .then((room) =>
      res.status(200).send(response("Room fetched successfully", true, room))
    )
    .catch((err) => res.status(500).send(response(err)));
};

export default {
  getRooms,
  postRoom,
  getRoom,
};
