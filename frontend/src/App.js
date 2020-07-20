import React from 'react';
import io from "socket.io-client"

function App() {
  const socket = io("http://localhost:4001");
  socket.on('connect', function () {
    console.log("connected")
  });
  socket.on('message', function (data) {
    console.log(data)
  });
  return (
    <div>
      Hello world
    </div>
  );
}

export default App;
