require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const axios = require("axios");

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

// cheatsheet
app.post("/cheatsheet/post", (req, res) => {
  const character = req.body.character;

  if (character) {
    broadcastCharacter(character);
    res.status(200).send("character sent");
  } else {
    res.status(400).send("character is required");
  }
});

function broadcastCharacter(message) {
  wssCheatsheet.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// cheatsheet connection
wssCheatsheet.on("connection", (ws) => {
  ws.send("Welcome to /cheatsheet");
});

// morse
app.get("/currentMorse", (req, res) => {
  const morse = req.body.morse;

  if (morse) {
    broadcastMorse({ type: "morse", message: morse });
    res.status(200).send("morse code sent");
  } else {
    res.status(400).send("morse code is required");
  }
});

function broadcastMorse(message) {
  wssMorse.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
}

wssMorse.on("connection", (ws) => {
  ws.on("message", (data, isBinary) => {
    const message = isBinary ? data.toString() : data;
    console.log("Received message:", message);
    broadcastMorse(message);
  });

  ws.send("Welcome to /morse");
});

// translation
app.get("/currentTranslation", (req, res) => {
  const translation = req.body.translation;

  if (translation) {
    broadcastTranslation({ type: "translation", message: translation });
    res.status(200).send("translation sent");
  } else {
    res.status(400).send("translation is required");
  }
  console.log(translation);
});

function broadcastTranslation(message) {
  wssTranslation.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
}

// chat connection
wssTranslation.on("connection", (ws) => {
  ws.on("message", (data, isBinary) => {
    const message = isBinary ? data.toString() : data;
    console.log("Received message:", message);
    broadcastTranslation(message);
  });

  ws.send("Welcome to /translation");
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
