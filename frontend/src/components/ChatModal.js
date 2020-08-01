import React from "react";
import "../styles/ChatModal.css";
import { Fade } from "react-awesome-reveal";
import Chat from "./Chat";

const ChatModal = ({
  closeModal,
  currentPlayer,
  chatThread,
  handleSendMessage,
}) => {
  return (
    <Fade triggerOnce className="chatModal__wrapper">
      <Chat
        mode={"modal"}
        currentPlayer={currentPlayer}
        chatThread={chatThread}
        handleSendMessage={handleSendMessage}
      />
      <button className="button__cancel" onClick={closeModal}>
        Close
      </button>
    </Fade>
  );
};

export default ChatModal;
