const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const moment = require("moment");
let now = moment();
const computerRoute = require("./computerRoute");
const initializePouch = require("./constants/initializePouch");

app.use(express.json());
app.use(cors());
app.use("/computerMove", computerRoute);
const fs = require("fs");

io.on("connection", (socket) => {
  require("./sockets/authSockets").listen(io, socket);
  require("./sockets/gameSockets").listen(io, socket);
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/verifyWord", async (req, res) => {
  //*words are objects with word key
  const words = req.body.words;
  const results = {};
  console.log("Words to verify");
  console.log(words);
  for (const wordObj in words) {
    const fileContent = fs.readFileSync("./wordsBig.txt");
    const regex = new RegExp("\\b" + wordObj.word + "\\b");
    if (regex.test(fileContent)) {
      results[wordObj.word] = "true";
    } else {
      results[wordObj.word] = "false";
    }
  }
  res.status(200).send(results);
});

app.get("/getPouch", (req, res) => {
  const pouch = initializePouch();
  res.status(200).send(pouch);
});
