import mongoose from "mongoose";
import config from "../utils/config";

export function initDb() {
	const URI = config.DB_URI || "mongodb://localhost:27017/test";
	return new Promise((resolve, reject) => {
		mongoose
			.connect(URI)
			.then((db) => {
				console.log("Connected to MongoDB", URI);
				resolve(db);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	})
}
