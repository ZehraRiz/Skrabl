import React from "react";
import "../styles/AboutModal.css";
import { Fade } from "react-awesome-reveal";

const AboutModal = ({ closeModal, lang }) => {
  return (
    <Fade triggerOnce className="aboutModal__wrapper">
      <div className="aboutModal__content">
        <h3>
          {lang === "en" && "Skrabl Development Team"}
          {lang === "tr" && "Skrabl Geliştirme Ekibi"}
          {lang === "fr" && "Équipe de développement Skrabl"}
          {lang === "de" && "Skrabl Entwicklungsteam"}
        </h3>
        <div className="aboutModal__team">
          <div className="aboutModal__dev">
            <h4>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ZehraRiz"
              >
                Zehra Rizvi
              </a>
            </h4>
          </div>
          <div className="aboutModal__dev">
            <h4>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.tommcandrew.co.uk/"
              >
                Tom McAndrew
              </a>
            </h4>
            <p></p>
          </div>
          <div className="aboutModal__dev">
            <h4>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://johndarke.net"
              >
                John Darke
              </a>
            </h4>
          </div>
          <div className="aboutModal__dev">
            <h4>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/ZehraRiz/Skrabl"
              >
                https://github.com/ZehraRiz/Skrabl
              </a>
            </h4>
          </div>
        </div>
        <button onClick={closeModal}>
          {lang === "en" && "Close"}
          {lang === "tr" && "Kapat"}
          {lang === "fr" && "Ferme "}
          {lang === "de" && "Schließen"}
        </button>
      </div>
    </Fade>
  );
};

export default AboutModal;
