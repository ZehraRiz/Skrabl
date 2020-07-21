import React, { useState } from "react";
import io from "socket.io-client";
import Login from "./components/Login";
import Header from "./components/Header";
import Players from "./components/Players";
import InviteScreen from "./components/InviteScreen";
import GameScreen from "./components/GameScreen";
import NotificationModal from "./components/NotificationModal";
import "./styles/global.css";
const socket = io("http://localhost:4001");

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("Login");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState("");
  const [players, setPlayers] = useState([]);
  const [invitedPlayer, setInvitedPlayer] = useState(null);
  const [gameId, setGameId] = useState("");
  const [gameData, setGameData] = useState(null);
  const [allPlayers, setAllPlayers] = useState(players);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const nextPlayer = () => {
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  };

  const handleCloseNotificationModal = () => {
    setNotification(null);
  };

  socket.on("welcomeNewUser", ({ user }) => {
    setAllPlayers([...allPlayers, user]);
  });

  const handleRequestGame = (player) => {
    setInvitedPlayer(player);
    setCurrentComponent("InviteScreen");
  };

  const handleSendInvite = () => {
    //create a new game
    //send selected time limit here?
    socket.emit("createGame", user.id);
    //invalid userId on create game
    socket.on("createGameError", (data) => {
      console.log(data);
      return;
    });
    //create game succesful, a gameId is sent back that can be used by two players to play the game
    socket.on("gameCreateResponse", (data) => {
      //get randomly selected starting player here?
      setCurrentPlayer(0);
      setGameId(data);
      setCurrentComponent("GameScreen");
    });
  };

  const acceptInvite = (e) => {
    e.preventDefault();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(e.target.message.value);
    //emit message to backend here
    e.target.reset();
  };

  //DUMMY DATA
  const chat = [
    "Hi",
    "Hello",
    "How are you?",
    "Fine, thanks.",
    "What are you doing?",
    "Playing Scrabble. How about you?",
    "The same",
  ];

  return (
    <div>
      <Header />
      {currentComponent === "Login" && (
        <Login
          setCurrentComponent={setCurrentComponent}
          setUser={setUser}
          socket={socket}
          setPlayers={setPlayers}
        />
      )}
      {currentComponent === "Players" && (
        <Players
          allPlayers={allPlayers}
          socket={socket}
          user={user}
          setCurrentComponent={setCurrentComponent}
          setInvitedPlayer={setInvitedPlayer}
          setGameId={setGameId}
          acceptInvite={acceptInvite}
          handleRequestGame={handleRequestGame}
        />
      )}
      {currentComponent === "InviteScreen" && (
        <InviteScreen
          handleSendInvite={handleSendInvite}
          invitedPlayer={invitedPlayer}
          setInvitedPlayer={setInvitedPlayer}
          setCurrentComponent={setCurrentComponent}
        />
      )}
      {currentComponent === "GameScreen" && (
        <GameScreen
          setNotification={setNotification}
          handleSendMessage={handleSendMessage}
          chat={chat}
          nextPlayer={nextPlayer}
          playerIndex={playerIndex}
          setCurrentComponent={setCurrentComponent}
          currentPlayer={currentPlayer}
        />
      )}
      {notification && (
        <NotificationModal
          notification={notification}
          handleCloseNotificationModal={handleCloseNotificationModal}
        />
      )}
    </div>
  );
};

export default App;
