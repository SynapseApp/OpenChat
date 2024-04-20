import mongoose, { Schema } from "mongoose";
import { IRoom } from "./room.model";
import { IUser } from "./user.model";

export interface IMessage extends Document {
  sender: IUser;
  room: IRoom;
  time: string;
  content: string;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
  time: String,
  content: String,
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
