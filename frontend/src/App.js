import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import InviteScreen from "./components/InviteScreen";
import UserBusy from "./components/UserBusy";
import GameScreen from "./components/GameScreen";
import NotificationModal from "./components/NotificationModal";
import RulesModal from "./components/RulesModal";
import "./styles/global.css";
import WelcomeScreen from "./components/WelcomeScreen";
import TitleScreen from "./components/TitleScreen";

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("TitleScreen");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState("");
  const [players, setPlayers] = useState([]);
  const [invitedPlayer, setInvitedPlayer] = useState(null);
  const [gameId, setGameId] = useState("");
  const [gameData, setGameData] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(); // 0 means he was the host and his data is stored as player1 at the backend. 1 means he is player2
  const [socket, setSocket] = useState(null);
  const [inviteSent, setInviteSent] = useState(false);
  const [viewRules, setViewRules] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [newChatMsg, setNewChatMsg] = useState(false);
  const [lang, setLang] = useState("en");
  const [level, setLevel] = useState("normal");

  useEffect(() => {
    if (gameMode === "Computer") {
      setCurrentPlayer(0);
      setCurrentComponent("GameScreen");
    }
    if (gameMode === "Online") {
      setSocket(io("http://localhost:4001"));
      setCurrentComponent("Login");
    }
  }, [gameMode]);

  const handleCloseNotificationModal = () => {
    setNotification(null);
  };

  const handleChooseComputer = () => {
    setGameMode("Computer");
  };

  const handleChooseOnline = () => {
    setGameMode("Online");
  };

  const handleClickRules = () => {
    setViewRules(!viewRules);
  };

  const handleClickChat = () => {
    setViewChat(!viewChat);
    setNewChatMsg(false);
  };

  const handleNewChatMsg = () => {
    setNewChatMsg(true);
  }

  const resetChatMsg = () => {
    setNewChatMsg(false);
  }

  const handleStart = () => {
    setCurrentComponent("WelcomeScreen");
  };

  const setLangEn = () => {
    setLang("en");
  };
  const setLangFr = () => {
    setLang("fr");
  };
  const setLangDe = () => {
    setLang("de");
  };
  const setLangTr = () => {
    setLang("tr");
  };

  return (
    <div className="page">
      {currentComponent !== "TitleScreen" && (
        <Header
          currentComponent={currentComponent}
          newChatMsg={newChatMsg}
          handleStart={handleStart}
          handleClickRules={handleClickRules}
          handleClickChat={handleClickChat}
          gameMode={gameMode}
        />
      )}
      {currentComponent === "TitleScreen" && (
        <TitleScreen handleStart={handleStart} />
      )}
      {currentComponent === "WelcomeScreen" && (
        <WelcomeScreen
          handleChooseOnline={handleChooseOnline}
          handleChooseComputer={handleChooseComputer}
          setLangEn={setLangEn}
          setLangFr={setLangFr}
          setLangDe={setLangDe}
          setLangTr={setLangTr}
        />
      )}
      {currentComponent === "Login" && (
        <Login
          handleStart={handleStart}
          setCurrentComponent={setCurrentComponent}
          setUser={setUser}
          socket={socket}
          setPlayers={setPlayers}
          setInvitedPlayer={setInvitedPlayer}
          setGameId={setGameId}
          setInvitedPlayer={setInvitedPlayer}
          setInviteSent={setInviteSent}
          setCurrentPlayer={setCurrentPlayer}
          setGameData={setGameData}
          lang={lang}
        />
      )}
      {currentComponent === "Players" && (
        <Players
          handleStart={handleStart}
          players={players}
          setPlayers={setPlayers}
          socket={socket}
          user={user}
          setCurrentComponent={setCurrentComponent}
          setInvitedPlayer={setInvitedPlayer}
          setGameId={setGameId}
          setGameData={setGameData}
          setNotification={setNotification}
          setCurrentPlayer={setCurrentPlayer}
          lang={lang}
        />
      )}
      {currentComponent === "InviteScreen" && (
        <InviteScreen
          user={user}
          setInvitedPlayer={setInvitedPlayer}
          setCurrentComponent={setCurrentComponent}
          invitedPlayer={invitedPlayer}
          gameId={gameId}
          setGameData={setGameData}
          socket={socket}
          setCurrentPlayer={setCurrentPlayer}
          inviteSent={inviteSent}
          setInviteSent={setInviteSent}
        />
      )}
      {currentComponent === "GameScreen" && (
        <GameScreen
          resetChatMsg={resetChatMsg}
          handleNewChatMsg={handleNewChatMsg}
          handleClickChat={handleClickChat}
          viewChat={viewChat}
          user={user}
          invitedPlayer={invitedPlayer} //basically, the opponent
          setNotification={setNotification}
          setCurrentComponent={setCurrentComponent}
          setCurrentPlayer={setCurrentPlayer}
          currentPlayer={currentPlayer}
          gameData={gameData}
          socket={socket}
          gameMode={gameMode}
          lang={lang}
          level={level}
          setGameMode={setGameMode}
        />
      )}
      {currentComponent === "UserBusy" && <UserBusy socket={socket} />}
      {notification && (
        <NotificationModal
          notification={notification}
          handleCloseNotificationModal={handleCloseNotificationModal}
        />
      )}
      {viewRules && <RulesModal lang={lang} closeModal={handleClickRules} />}
    </div>
  );
};

export default App;
