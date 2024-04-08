import mongoose, { Schema } from "mongoose";

export type User = {
	username: string;
	email: string;
	password: string;
};

export const userSchema = new Schema<User>({
	username: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
});

const User = mongoose.model<User>("User", userSchema);

export default User;
