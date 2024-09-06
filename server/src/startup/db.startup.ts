import mongoose from "mongoose";
import config from "../utils/config";

export function initDb() {
	const URI = config.DB_URI || "mongodb://localhost:27017/test";
	mongoose
		.connect(URI)
		.then((db) => {
			console.log("Connected to MongoDB", URI);
		})
		.catch((err) => {
			console.log(err);
		});

}
