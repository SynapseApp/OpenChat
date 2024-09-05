import env from "dotenv";

env.config();

const config = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  CLIENT_URL: process.env.CLIENT_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SALT_ROUNDS: 10,
};

export const corsConfig = {
  origin: config.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
  ],
  credentials: true,
};

export default config;
