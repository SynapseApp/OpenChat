import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

import { app, httpServer } from "./server";
import config, { corsConfig } from "./utils/config";
import { initDb } from "./startup/db.startup";
import { initAuth } from "./startup/auth.startup";
import passport from "passport";
import { initRoutes } from "./routes";
import { default as connectMongoDBSession } from "connect-mongodb-session";

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
	uri: String(config.DB_URI), // MongoDB connection URL
	collection: "Synapse-OpenChat"
});

// Handle errors from the session store
store.on(`error`, function (error) {
	console.log(error);
});

app.use(cors(corsConfig));
app.use(express.json());
app.use(morgan("common"));
app.use(
	session({
		secret: config.SESSION_SECRET || "TEST_SECRET",
		resave: false,
		saveUninitialized: false,
		store,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 28, // Set the maximum age of the session cookie to 1 day
			sameSite: "none"
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

initDb();
initAuth(app);
initRoutes(app);

httpServer.listen(config.PORT, () => {
	console.log(`Server is running on port ${config.PORT}`);
});
