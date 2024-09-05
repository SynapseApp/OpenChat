import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export const userSchema = new Schema<IUser>({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
