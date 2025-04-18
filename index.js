const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for development)
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

let lastMessage = "";

// REST API route
app.post("/api/message", (req, res) => {
  console.log("ESP32 Sent:", req.body.message);
  lastMessage = req.body.message;

  // Broadcast to all connected WebSocket clients
  io.emit("esp32-message", lastMessage);

  res.sendStatus(200);
});

// REST GET endpoint (optional)
app.get("/api/message", (req, res) => {
  res.json({ message: lastMessage });
});

// WebSocket connection handler
io.on("connection", (socket) => {
  console.log("Client connected via WebSocket");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
