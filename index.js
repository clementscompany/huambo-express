import { CreateDatabase } from "./src/database/db.js";
import { Server } from "socket.io";
import express from "express";
import http from "http";
import { Route } from "./src/routes/app.routes.js";
const app = express();

const httpServer = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/v1", Route);

const WSS = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});


httpServer.listen(3000, () => {
  console.log("http://localhost:3000");
});

CreateDatabase();

export { WSS };

