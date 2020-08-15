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
import MenuModal from "./components/MenuModal";
import AboutModal from "./components/AboutModal";
import "./styles/global.css";
import GameModeScreen from "./components/GameModeScreen";
import TitleScreen from "./components/TitleScreen";
import LevelSelectScreen from "./components/LevelSelectScreen";

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
  const [viewMenu, setViewMenu] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [viewAbout, setViewAbout] = useState(false);
  const [newChatMsg, setNewChatMsg] = useState(false);
  const [lang, setLang] = useState("en");
  const [level, setLevel] = useState("normal");
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (gameMode === "Computer") {
      setCurrentPlayer(0);
      setCurrentComponent("LevelSelectScreen");
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

  const handleClickMenu = () => {
    setViewMenu(!viewMenu);
  };

  const handleClickSound = () => {
    setMute(!mute);
  };

  const handleClickRules = () => {
    setViewMenu(false);
    setViewRules(!viewRules);
  };

  const handleClickAbout = () => {
    setViewMenu(false);
    setViewAbout(!viewAbout);
  };

  const handleClickChat = () => {
    setViewChat(!viewChat);
    setNewChatMsg(false);
  };

  const handleNewChatMsg = () => {
    setNewChatMsg(true);
  };

  const resetChatMsg = () => {
    setNewChatMsg(false);
  };

  const handleStart = () => {
    setGameMode(null);
    setCurrentComponent("GameModeScreen");
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

  const handleChooseEasy = () => {
    setLevel("easy");
    setCurrentComponent("GameScreen");
  };

  const handleChooseNormal = () => {
    setLevel("normal");
    setCurrentComponent("GameScreen");
  };

  const handleChooseHard = () => {
    setLevel("hard");
    setCurrentComponent("GameScreen");
  };

  return (
    <div className="page">
      {currentComponent !== "TitleScreen" && (
        <Header
          currentComponent={currentComponent}
          newChatMsg={newChatMsg}
          handleStart={handleStart}
          handleClickMenu={handleClickMenu}
          handleClickChat={handleClickChat}
          gameMode={gameMode}
        />
      )}
      {currentComponent === "TitleScreen" && (
        <TitleScreen handleStart={handleStart} />
      )}
      {currentComponent === "GameModeScreen" && (
        <GameModeScreen
          handleChooseOnline={handleChooseOnline}
          handleChooseComputer={handleChooseComputer}
          setLangEn={setLangEn}
          setLangFr={setLangFr}
          setLangDe={setLangDe}
          setLangTr={setLangTr}
          lang={lang}
        />
      )}
      {currentComponent === "LevelSelectScreen" && (
        <LevelSelectScreen
          handleStart={handleStart}
          handleChooseEasy={handleChooseEasy}
          handleChooseNormal={handleChooseNormal}
          handleChooseHard={handleChooseHard}
          lang={lang}
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
          setInviteSent={setInviteSent}
          setCurrentPlayer={setCurrentPlayer}
          setNotification={setNotification}
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
          setLang={setLang}
          invitedPlayer={invitedPlayer}
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
          lang={lang}
          setInviteSent={setInviteSent}
        />
      )}
      {currentComponent === "GameScreen" && (
        <GameScreen
          mute={mute}
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
          setGameData={setGameData}
          socket={socket}
          gameMode={gameMode}
          lang={lang}
          level={level}
          setGameMode={setGameMode}
          setInviteSent={setInviteSent}
          setInvitedPlayer={setInvitedPlayer}
          setGameId={setGameId}
          setGameData={setGameData}
        />
      )}
      {currentComponent === "UserBusy" && (
        <UserBusy
          socket={socket}
          lang={lang}
          setCurrentCompoent={setCurrentComponent}
        />
      )}
      {notification && (
        <NotificationModal
          notification={notification}
          handleCloseNotificationModal={handleCloseNotificationModal}
          lang={lang}
        />
      )}
      {viewRules && <RulesModal lang={lang} closeModal={handleClickRules} />}
      {viewAbout && <AboutModal lang={lang} closeModal={handleClickAbout} />}
      {viewMenu && (
        <MenuModal
          lang={lang}
          closeModal={handleClickMenu}
          handleClickRules={handleClickRules}
          handleClickSound={handleClickSound}
          handleClickAbout={handleClickAbout}
          mute={mute}
        />
      )}
    </div>
  );
};

export default App;
