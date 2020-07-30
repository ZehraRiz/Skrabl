import React, { useState, useEffect } from "react";
import "../styles/ChatModal.css";
import { Fade } from "react-awesome-reveal";
import Chat from "./Chat";

const ChatModal = ({ closeModal, gameId, currentPlayer, socket, chatThread, setChatThread }) => {
  return (
    <Fade triggerOnce className="chatModal__wrapper">
      <Chat
        mode={"modal"}
        gameId={gameId}
        currentPlayer={currentPlayer}
        socket={socket}
        chatThread={chatThread}
        setChatThread={setChatThread}
      />
      <button className="button__cancel" onClick={closeModal}>
        Close
      </button>
    </Fade>
  );
};

export default ChatModal;
