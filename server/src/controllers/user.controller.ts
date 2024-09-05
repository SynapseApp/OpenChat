import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import userService from "../services/user.service";
import response from "../utils/response";
import bcrypt from "bcrypt";
import config from "../utils/config";
import passport from "passport";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json(response("Email already in use"));
  }
  user = await User.findOne({ username });
  if (user) {
    return res.status(400).json(response("Username already in use"));
  }

  const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
  const newUser = await userService.create(username, email, hashedPassword);

  req.body.username = req.body.email;

  await login(req, res, next);
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", function (err: Error, user: any, info: any) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Handle the case where authentication fails
      // For example, redirect to the login page with an error message
      return res.status(401).json({ message: "Invalid username or password." });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send(response("User logged in", true, user));
    });
  })(req, res, next);
};

const isAuthenticated = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .send(response("User is authenticated", true, req.user));
  } else {
    return res.status(200).send(response("User is not authenticated"));
  }
};

const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) return res.status(400).send(response(err));
    else return res.status(200).send(response("Logged out successfully"));
  });
};

const getUsers = (req: Request, res: Response) => {
  User.find()
    .then((users) => {
      return res
        .status(200)
        .send(response("Users retrieved successfully", true, users));
    })
    .catch((err) => {
      if (err) return res.status(400).send(response(err));
    });
};

export default {
  register,
  login,
  logout,
  isAuthenticated,
  getUsers,
};
