require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");

const app = express();
const cors = require("cors");
const http = require("http");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jakubstadnik:12345@test.vaqoajx.mongodb.net/?retryWrites=true&w=majority&appName=test";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const usersRouter = require("./api/userListRoute");
const translationRoute = require("./api/translationRoute");
const translationSessionRoute = require("./api/translationSessionRoute");

app.use("/user", usersRouter);
app.use("/translation", translationRoute);
app.use("/translationSession", translationSessionRoute);

const server = http.createServer(app);

const wssCheatsheet = new WebSocket.Server({ noServer: true });
const wssMorse = new WebSocket.Server({ noServer: true });
const wssTranslation = new WebSocket.Server({ noServer: true });

wssCheatsheet.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("Received message on /ws/cheatsheet:", message);
    // Forward to local Node-RED
    // TODO: Implement the forward logic
  });
});

wssMorse.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("Received message on /ws/morse:", message);
    // Forward to local Node-RED
    // TODO: Implement the forward logic
  });
});

wssTranslation.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("Received message on /ws/translation:", message);
    // Forward to local Node-RED
    // TODO: Implement the forward logic
  });
});

server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`)
    .pathname;

  if (pathname === "/ws/cheatsheet") {
    wssCheatsheet.handleUpgrade(request, socket, head, (ws) => {
      wssCheatsheet.emit("connection", ws, request);
    });
  } else if (pathname.startsWith("/ws/morse")) {
    wssMorse.handleUpgrade(request, socket, head, (ws) => {
      wssMorse.emit("connection", ws, request);
    });
  } else if (pathname.startsWith("/ws/translation")) {
    wssTranslation.handleUpgrade(request, socket, head, (ws) => {
      wssTranslation.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
