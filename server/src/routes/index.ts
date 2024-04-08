import { Express } from "express";
import userRouter from "./user.route";

export function initRoutes(app: Express) {
	app.use("/user", userRouter);

	app.use("*", (req, res) => res.status(404).send("UNREGISTERED ENDPOINT"));
}
