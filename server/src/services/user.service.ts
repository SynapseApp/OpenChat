import User from "../models/user.model";

const create = async (username: string, email: string, password: string) => {
	const newUser = new User({
		username,
		email,
		password,
	});
	const savedUser = await newUser.save();
	return savedUser;
};

export default {
	create,
};
