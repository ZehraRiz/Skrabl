import React, { useState, useEffect } from "react";
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
  const [currentComponent, setCurrentComponent] = useState("Players");
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState("");
  const [players, setPlayers] = useState([]);
  const [invitedPlayer, setInvitedPlayer] = useState(null);
  const [gameId, setGameId] = useState("");
  const [gameData, setGameData] = useState(null);
  const [allPlayers, setAllPlayers] = useState(players);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  //presumably the player who sends the invite will be 0 and the intvitee will be 1?
  const [playerIndex, setPlayerIndex] = useState(0);

  const nextPlayer = () => {
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  };

  useEffect(() => {
    console.log("current player is now " + currentPlayer);
  }, [currentPlayer]);

  const handleCloseNotificationModal = () => {
    console.log("closing notification modal");
    setNotification(null);
  };

  socket.on("welcomeNewUser", ({ user }) => {
    console.log("adding new player to list");
    console.log(user);
    setAllPlayers([...allPlayers, user]);
  });

  const handleRequestGame = (player) => {
    console.log("handle request game");
    console.log("setting invited player to");
    console.log(player);
    setInvitedPlayer(player);
    setCurrentComponent("InviteScreen");
  };

  const handleSendInvite = () => {
    console.log("handleSendInvite");
    console.log("inviting:");
    console.log(invitedPlayer);

    //create a new game
    console.log("emitting create game");
    console.log("user id: " + user.id);
    socket.emit("createGame", user.id);

    //invalid userId on create game
    socket.on("createGameError", (data) => {
      console.log(data);
      return;
    });

    //create game succesful, a gameId is sent back that can be used by two players to play the game
    socket.on("gameCreateResponse", (data) => {
      console.log("game created successfully");
      console.log("game id: " + data);
      //get randomly selected starting player here?
      setCurrentPlayer(0);
      setGameId(data);
      setCurrentComponent("GameScreen");
    });
  };

  const acceptInvite = (e) => {
    e.preventDefault();
    console.log("accept invite");
    console.log(e.target.invite.value);
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
          currentPlayer={currentPlayer}
          nextPlayer={nextPlayer}
          playerIndex={playerIndex}
          setCurrentComponent={setCurrentComponent}
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
