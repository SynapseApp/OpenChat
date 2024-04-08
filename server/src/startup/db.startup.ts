import mongoose from "mongoose";
import config from "../utils/config";

export function initDb() {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(config.DB_URI || "mongodb://localhost:27017/test")
			.then((db) => {
				console.log("Connected to MongoDB");
				resolve(db);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
}
