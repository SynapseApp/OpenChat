import express from "express";
import { Server } from "http";
import { Server as ServerIO } from "socket.io";
import { corsConfig } from "./utils/config";
import passport from "passport";
import mongoose from "mongoose";

const app = express();
const httpServer = new Server(app);
const io = new ServerIO(httpServer, { cors: corsConfig });

export { app, httpServer, io };
