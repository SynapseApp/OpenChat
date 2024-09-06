import mongoose from "mongoose";
import config from "../utils/config";

export function initDb() {
	mongoose
		.connect(config.DB_URI || "mongodb://localhost:27017/test")
		.then((db) => {
			console.log("Connected to MongoDB");
		})
		.catch((err) => {
			console.log(err);
		});

}
