const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/esp32", (req, res) => {
  const message = req.body.message;
  console.log("ESP32 sent:", message);

  // Emit message to connected clients
  io.emit("esp32-data"", message);

  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
