import React, {useState, useEffect} from "react";
import "../styles/Chat.css";
const moment = require('moment');
let now = moment();

const Chat = ({ gameId, currentPlayer, socket, mode }) => {
	const [chatThread, setChatThread] = useState([{ playerFromBackend: 0, playerName: "SkrablBot", msg: "Welcome, you are now connected", date: now.format("h:mm:ss a") }]);
	
 	socket.on("recieveMsg", (data) => {
      setChatThread([...chatThread, data]);
    });
	socket.on("chatError", data=> console.log(data))

  const handleSendMessage = (e) => {
	  e.preventDefault();
	  const token = localStorage.getItem("token")
		const newMessage = e.target.message.value;
    socket.emit("sendMsg", { token , gameId, currentPlayer, newMessage });
    e.target.reset()
  };


	return (
		<div className={mode === 'modal' ? "chat__wrapper modal" : "chat__wrapper"}>
			<ul className="chat__list">
				{chatThread.map((message, index) => (
					<li className="chat__message" key={index}>
						<h5>{message.playerName}: </h5>
						<p className={message.playerFromBackend=== currentPlayer? "host" : "guest" }>{message.date}</p>
						<p className={message.playerFromBackend=== currentPlayer? "host" : "guest" }>{message.msg}</p>
					</li>
				))}
			</ul>
			<form onSubmit={handleSendMessage}>
				<input type="text" name="message" />
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default Chat;
