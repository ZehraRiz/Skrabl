import React, { useState, useEffect } from "react";
import "../styles/InviteScreen.css";
import { Fade } from "react-awesome-reveal";

const InviteScreen = ({
  user,
  setInvitedPlayer,
  setCurrentComponent,
  invitedPlayer,
  gameId,
  setGameData,
  socket,
  setCurrentPlayer,
  inviteSent,
  setInviteSent,
  lang,
  setLang
}) => {
  const [timeInput, setTimeInput] = useState(20);
  let [invite, setInvite] = useState("");

  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
  };

  const handleClose = () => {
    socket.emit("removeGame", gameId);
    socket.on("removedGame", (data) => {
      console.log(data);
      setInvitedPlayer("");
      setInviteSent(false)
      setInvite("")
      setCurrentComponent("Players");
    });
  };

  socket.on("userChangeRoom", (data) => {
    setLang(data)
     setInvitedPlayer("");
    setInviteSent(false)
    setCurrentComponent("Login")
      });


  socket.on("gameJoined2", (data) => {
    if (invite === "") {
      setCurrentPlayer(0);
      setGameData(data.game);
      setCurrentComponent("GameScreen");
    } else {
      setCurrentPlayer(1);
      setGameData(data.game);
      setInvitedPlayer(invite.host);
      setCurrentComponent("GameScreen");
    }
  });

  socket.on("invite", (data) => {
    setInvite(data);
  });
  const acceptInvite = () => {
    setInvite("");
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

  const handleApplyOptions = () => {
    setInviteSent(true);
    //request to join game
    socket.emit("joinGame", {
      token: user.token,
      gameId: gameId,
      time: timeInput,
    });
  };

    useEffect(() => {
       //add notifications here and setDisplayedComponentBack
      
    socket.on("joinGameError", (data) => {
      console.log(data);
      setInviteSent(false);
      setCurrentComponent = "Players";
    });
    //on succesful game join
    socket.off("gameJoined").on("gameJoined", (data) => {
      console.log(data);
      setInviteSent(true);
      socket.emit("gameRequest", {
        token: user.token,
        gameId: gameId,
        invitedPlayer: invitedPlayer,
      });
      socket.on("gameRequestError", (data) => {
        //should remove game from uId in backend too
        console.log(data);
        setInviteSent(false);
        setCurrentComponent = "Players";
      });
      socket.on("gameJoined2", (data) => {
        setCurrentPlayer(0);
        setGameData(data.game);
        setCurrentComponent("GameScreen");
      });
    });
    }, [])
  


  return (
    <Fade triggerOnce>
      <div className="inviteScreen__wrapper">
        <h3>
          {lang === "en" && "You are inviting:"}
          {lang === "tr" && "Davet ettiğin kişi:"}
          {lang === "fr" && "Vous invitez:"}
          {lang === "de" && "Sie laden ein:"}
          {invitedPlayer.name}
        </h3>
        <div className="inviteScreen__list">
          {!inviteSent && (
            <div className="inviteScreen__option">
              <label htmlFor="time">
                {lang === "en" && "Time per player per game (mins):"}
                {lang === "tr" && "Oyunda oyuncu başına süre (dakika):"}
                {lang === "fr" && "Temps par joueur et par partie (minutes):"}
                {lang === "de" && "Zeit pro Spieler und Spiel (Minuten):"}
              </label>
              <input
                type="number"
                id="time"
                value={timeInput}
                onChange={handleTimeChange}
              />
            </div>
          )}
        </div>
        <div className="inviteScreen__buttons">
          <button type="button" onClick={handleClose}>
            {lang === "en" && "Cancel"}
            {lang === "tr" && "Iptal"}
            {lang === "fr" && "Annuler"}
            {lang === "de" && "Stornieren "}
          </button>

          {!inviteSent && (
            <button type="button" onClick={handleApplyOptions}>
              {lang === "en" && "Send invite"}
              {lang === "tr" && "Daveti gönder"}
              {lang === "fr" && "Envoyer invitation"}
              {lang === "de" && "Senden Einladung"}
            </button>
          )}

          {inviteSent && (
            <p>
              {lang === "en" && "Waiting for player to accept invite."}
              {lang === "tr" && "Oyuncunun daveti kabul etmesi bekleniyor."}
              {lang === "fr" &&
                "En attente de l'acceptation de l'invitation par le joueur."}
              {lang === "de" &&
                "Warten auf die Annahme der Einladung durch den Spieler. "}
            </p>
          )}
          {invite !== "" && (
            <div>
              <p>
                {invite.host.name} {lang === "en" && "sent you a game request."}
                {lang === "tr" && "sana bir oyun daveti gönderdi."}
                {lang === "fr" && "vous a envoyé une demande de jeu."}
                {lang === "de" && "hat dir eine Spielanfrage geschickt."}
              </p>
              <button onClick={acceptInvite}>
                {invite.host.name} {lang === "en" && "Click to accept"}
                {lang === "tr" && "Kabul etmek için tıklay"}
                {lang === "fr" && "Cliquez pour accepter"}
                {lang === "de" && "Klicken Sie zum Akzeptieren"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default InviteScreen;