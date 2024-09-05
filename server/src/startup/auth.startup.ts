import { Express } from "express";
import passport from "passport";
import Local from "passport-local";
import authService from "../services/auth.service";
import User from "../models/user.model";

export function initAuth(app: Express) {
	passport.use(new Local.Strategy(authService.verify));

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then((user) => done(null, user))
			.catch((err) => done(err, null));
	});
}
