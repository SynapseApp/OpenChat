import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/is-authenticated", userController.isAuthenticated);

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.post("/logout", userController.logout);

userRouter.get("/", userController.getUsers);

export default userRouter;
