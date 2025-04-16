const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let lastMessage = "";

app.post("/api/message", (req, res) => {
  console.log("ESP32 Sent:", req.body.message);
  lastMessage = req.body.message;
  res.sendStatus(200);
});

app.get("/api/message", (req, res) => {
  res.json({ message: lastMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
