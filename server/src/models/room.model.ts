import mongoose, { Document, Mongoose, Schema } from "mongoose";
import { IUser } from "./user.model";
import { IMessage } from "./message.model";

export interface IRoom extends Document {
  users: IUser[];
}

const roomSchema = new Schema<IRoom>({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Room = mongoose.model<IRoom>("Room", roomSchema);
export default Room;
