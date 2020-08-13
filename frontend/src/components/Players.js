import React, { useState, useEffect } from "react";
import "../styles/Players.css";
import { Fade } from "react-awesome-reveal";
import Login from "./Login";

const Players = ({
  players,
  setPlayers,
  socket,
  user,
  setCurrentComponent,
  setInvitedPlayer,
  setGameId,
  setNotification,
  setGameData,
  setCurrentPlayer,
  handleStart,
  lang,
  setLang,
  setInviteSent

}) => {

  let [invite, setInvite] = useState("");
  
  socket.on("userChangeRoom", (data) => {
    setLang(data)
        setCurrentComponent("Login")
  });
  
  
  useEffect(() => {
      socket.off("playerUnavailable").on("playerUnavailable", (data) => {
      console.log("3. got player availabilty")
      if (data === true) {
        setNotification("Player is in another game");
        return;
      } else {
        socket.emit("createGame", { userToken: user.token, lang: lang });
        console.log("4. sending create game to backend")
      }
        });
}, [])
 
   
  
  socket.on("invite", (data) => {
    setInvite(data);
  });
  const acceptInvite = () => {
    socket.emit("inviteAccepted", {
      token: user.token,
      gameId: invite.game.gameId,
    });
    socket.on("2joinGameError", (data) => {
      console.log(data);
    });
    socket.on("gameJoined2", (data) => {
      console.log(data);
      setCurrentPlayer(1);
      setGameData(data.game);
      setInvitedPlayer(invite.host);
      setCurrentComponent("GameScreen");
    });
  };

  socket.on("welcomeNewUser", (data) => {
    if (data.token == localStorage.getItem("token")) return;
    setPlayers([...players, data]);
  });

  socket.on("userLeft", (user) => {
    console.log("a user left" + user);
    setPlayers(players.filter((u) => u.token != user.token));
  });

  const sendInvite = (player) => {
    setInvitedPlayer(player);
    console.log("1. cliked on player. emitting playerInGame")
    socket.emit("playerInGame", player);
    
      socket.on("createGameError", (data) => {
          console.log(data);
          return;
        });
     socket.on("gameCreateResponse", (data) => {
          console.log("6. IN GAMEcREATErESPONSEthe game Id got back: " + data);
          setGameId(data);
          setCurrentComponent("InviteScreen");
        });
  };

  return (
    <Fade triggerOnce>
      <div className="players__wrapper">
        <h3>
          {lang === "en" && "Players online"}
          {lang === "tr" && "Çevrimiçi oyuncular"}
          {lang === "fr" && "Joueurs en ligne "}
          {lang === "de" && "Spieler online"}
        </h3>
        {lang === "en" && "Click on a player to invite them for a game."}
        {lang === "tr" && "Bir oyuna davet etmek için bir oyuncuyu tıklay."}
        {lang === "fr" && "Cliquez sur un joueur pour l'inviter à une partie."}
        {lang === "de" &&
          "Klicken Sie auf einen Spieler, um ihn zu einem Spiel einzuladen."}
        <ul className="players__list">
          {players.map((player, index) => {
            return (
              <li
                key={index}
                value={player}
                onClick={() => {
                  sendInvite(player);
                }}
                className="players__player"
              >
                {player.name}
              </li>
            );
          })}
        </ul>
        {players.length < 1 && (
          <>
            <p>
              {lang === "en" && "No one's online at the moment."}
              {lang === "tr" && "Şu anda kimse çevrimiçi değil."}
              {lang === "fr" && "Personne n'est en ligne pour le moment."}
              {lang === "de" && "Im Moment ist niemand online."}
            </p>
            <button className="return__button" onClick={handleStart}>
              {lang === "en" && "Back to main menu"}
              {lang === "tr" && "Ana menüye geri git"}
              {lang === "fr" && "Retour au menu principal"}
              {lang === "de" && "Zurück zum Hauptmenü"}
            </button>
          </>
        )}
        {invite !== "" && (
          <div className="player__invitations">
            <h3>
              {lang === "en" && "Incoming invitations"}
              {lang === "tr" && "Gelen davetler"}
              {lang === "fr" && "Invitations entrantes"}
              {lang === "de" && "Eingehende Einladungen"}
            </h3>
            <div className="player__invite-request">
              <p>
                {invite.host.name} {lang === "en" && "sent you a game request."}
                {lang === "tr" && "sana bir oyun daveti gönderdi."}
                {lang === "fr" && "vous a envoyé une demande de jeu."}
                {lang === "de" && "hat dir eine Spielanfrage geschickt."}
              </p>
              <button onClick={acceptInvite}>Click to accept</button>
              <button className="return__button" onClick={handleStart}>
                {lang === "en" && "Back to main menu"}
                {lang === "tr" && "Ana menüye geri git"}
                {lang === "fr" && "Retour au menu principal"}
                {lang === "de" && "Zurück zum Hauptmenü"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
};

export default Players;