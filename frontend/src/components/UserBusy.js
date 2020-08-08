import React from "react";

const UserBusy = ({ socket, lang, setCurrentCompoent }) => {
  socket.on("retrivedGame", (data) => {
    setCurrentCompoent("Login")
  });

  //retrived game setup
  //join it to game room when sent back
  return (
    <div>
      <h5>
        {lang === "en" && "You are already in a game."}
        {lang === "tr" && "Zaten bir oyundasın."}
        {lang === "fr" && "Vous êtes déjà dans un jeu."}
        {lang === "de" && "Du bist schon in einem Spiel."}
      </h5>
    </div>
  );
};

export default UserBusy;
