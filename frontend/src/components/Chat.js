import React from "react";
import "../styles/Chat.css";

const Chat = React.memo(
  ({ currentPlayer, mode, chatThread, handleSendMessage }) => {
    return (
      <div
        className={mode === "modal" ? "chat__wrapper modal" : "chat__wrapper"}
      >
        <ul className="chat__list">
          {chatThread.map((message, index) => (
            <li className="chat__message" key={index}>
              <h5>{message.playerName}: </h5>
              <p
                className={
                  message.playerFromBackend === currentPlayer ? "host" : "guest"
                }
              >
                {message.date}
              </p>
              <p
                className={
                  message.playerFromBackend === currentPlayer ? "host" : "guest"
                }
              >
                {message.msg}
              </p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage}>
          <input type="text" name="message" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.chatThread.length === nextProps.chatThread.length) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
  }
);

export default Chat;
