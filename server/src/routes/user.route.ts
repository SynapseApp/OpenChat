import { Router } from "express";
import userController from "../controllers/user.controller";
import passport from "passport";
import response from "../utils/response";

const userRouter = Router();

userRouter.get("/is-authenticated", userController.isAuthenticated);

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.post("/logout", userController.logout);

export default userRouter;
