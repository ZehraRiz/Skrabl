import React from "react";
import "../styles/Chat.css";

const Chat = ({ chat, handleSendMessage }) => {
  return (
    <div className="chat__wrapper">
      <ul className="chat__list">
        {chat.map((message, index) => (
          <li className="chat__message" key={index}>
            {message}
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
