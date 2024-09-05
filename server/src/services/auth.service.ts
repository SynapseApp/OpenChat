import Local from "passport-local";
import User from "../models/user.model";
import bcrypt from "bcrypt";

const verify: Local.VerifyFunction = async (username, password, done) => {
	const user = await User.findOne({ email: username });

	if (!user) {
		return done(null, false, { message: "Invalid email" });
	}

	bcrypt.compare(password, user.password).then((success) => {
		if (success) {
			return done(null, user);
		} else {
			return done(null, false, { message: "Invalid password" });
		}
	});
};

export default {
	verify,
};
