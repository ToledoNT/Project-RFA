import express from "express";
import Status from "./router/status-router";
import UserRoute from "./router/user-route";
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api", Status);
server.use("/api", UserRoute);

export { server };