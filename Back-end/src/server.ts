import express from "express";
import cors from "cors";
import Status from "./router/status-router";
import UserRoute from "./router/user-route";

const server = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

server.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", Status);
server.use("/api", UserRoute);

export { server };
