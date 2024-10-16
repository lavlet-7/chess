const express = require("express");
const http = require("http");
const websocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new websocket.Server({ server });
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Testing websocket server!</h1>");
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Client says: ${message}`);

    if (message.toString() === "e4") ws.send("e5");
  });

  ws.on("close", () => {
    console.log("Client disconnected!");
  });
});

server.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
