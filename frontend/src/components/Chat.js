import React from "react";
import "../styles/Chat.css";

const Chat = ({ currentPlayer, mode, chatThread, handleSendMessage, lang }) => {
  return (
    <div className={mode === "modal" ? "chat__wrapper modal" : "chat__wrapper"}>
      <div className={mode ==="modal" ? "chat__list-wrapper-modal" : "chat__list-wrapper"}>
        <ul className="chat__list">
          {chatThread.map((message, index) => (
            <li className="chat__message" key={index}>
              <h5>{message.playerName}: </h5>
              <p className="timeStamp">{message.date}</p>
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
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" name="message" />
        <button type="submit">
          {lang === "en" && "Send"}
          {lang === "tr" && "Gönder"}
          {lang === "fr" && "Envoyer"}
          {lang === "de" && "Senden"}
        </button>
      </form>
    </div>
  );
};
export default Chat;
