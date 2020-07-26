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

io.on("connection", (socket) => {
  require("./sockets/authSockets").listen(io, socket);
  require("./sockets/gameSockets").listen(io, socket);
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/verifyWord", async (req, res) => {
  //*words are objects with word key
  const words = req.body.words;
  const results = {};
  for (const word of words) {
    const uri =
      "https://dictionaryapi.com/api/v3/references/collegiate/json/" +
      word.word +
      "?key=" +
      process.env.DICTIONARY_KEY;
    try {
      const response = await axios.get(uri);
      if (
        response.data[0] &&
        response.data[0].meta &&
        response.data[0].fl !== "abbreviation"
      ) {
        results[word.word] = "true";
      } else {
        results[word.word] = "false";
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({ err });
    }
  }
  res.status(200).send(results);
});

app.get("/getPouch", (req, res) => {
  console.log("get pouch");
  const pouch = initializePouch();
  res.status(200).send(pouch);
});
