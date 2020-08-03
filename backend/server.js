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
const computerRoute = require("./computerRoute");
const initializePouch = require("./utils/initializePouch");

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

  const { words, lang } = req.body;
  let wordListToUse;
  if (lang === "en") {
    wordListToUse = "./dictionaries/englishBig.txt";
  } else if (lang === "tr") {
    wordListToUse = "./dictionaries/turkishBig.txt";
  } else if (lang === "fr") {
    wordListToUse = "./dictionaries/french.txt";
  }
  const results = {};
  words.forEach((wordObj) => {
    const fileContent = fs.readFileSync(wordListToUse);
    const regex = new RegExp(`,${wordObj.word},`);
    if (regex.test(fileContent)) {
      results[wordObj.word] = "true";
    } else {
      results[wordObj.word] = "false";
    }
  });
  res.status(200).send(results);
});

app.post("/getPouch", (req, res) => {
  const { lang } = req.body;
  const pouch = initializePouch(lang);
  res.status(200).send(pouch);
});
