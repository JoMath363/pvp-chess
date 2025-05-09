import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./src/socketHandler.js";

dotenv.config();
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

export default io;

socketHandler(io);

server.listen(port, () => {
  console.log(`server listening on: http://localhost:${port}/`);
});

