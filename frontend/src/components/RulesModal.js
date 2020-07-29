import React from "react";
import "../styles/RulesModal.css";
import { Fade } from "react-awesome-reveal";

const RulesModal = ({closeModal}) => {
  return (
    
      
    <Fade triggerOnce className="rulesModal__wrapper">
        <div className="rulesModal__content">
          <h1>Skrabl Rules</h1>
          <p>
            When playing Skrabl, anywhere from one to two players will enjoy
            the game. The object when playing is to score more points than other
            players. As words are placed on the game board, points are collected
            and each letter that is used in the game will have a different point
            value. The main strategy is to play words that have the highest
            possible score based on the combination of letters.
          </p>

          <h3>The Skrabl Board</h3>
          <p>
            A Skrabl board will consist of cells that are located in
            a large square grid. The board offers 15 cells high and 15 cells
            wide. The tiles used on the game will fit in each cell on the board.
          </p>

          <h3>Skrabl Tiles</h3>
          <p>
            There are 100 tiles that are used in the game and 98 of them will
            contain letters and point values. There are 2 blank tiles that can
            be used as wild tiles to take the place of any letter. When a blank
            is played, it will remain in the game as the letter it substituted
            for.
          </p>

          <p>
            Different letters in the game will have various point values and
            this will depend on how rare the letter is and how difficult it may
            be to lay that letter. Blank tiles will have no point values.
          </p>

          <h3>Tile Values</h3>
          <p>
            Below are the point values for each letter that is used in a
            Skrabl game.
          </p>

          <p>0 Points - Blank tile.</p>

          <p>1 Point - A, E, I, L, N, O, R, S, T and U.</p>

          <p>2 Points - D and G.</p>

          <p>3 Points - B, C, M and P.</p>

          <p>4 Points - F, H, V, W and Y.</p>

          <p>5 Points - K.</p>

          <p>8 Points - J and X.</p>

          <p>10 Points - Q and Z.</p>

          <h3>Extra Point Values</h3>
          <p>
            When looking at the board, players will see that some squares offer
            multipliers. Should a tile be placed on these squares, the value of
            the tile will be multiplied by 2x or 3x. Some squares will also
            multiply the total value of the word and not just the single point
            value of one tile.
          </p>

          <p>
            Double Letter Scores - The light blue cells in the board are
            isolated and when these are used, they will double the value of the
            tile placed on that square.
          </p>

          <p>
            Triple Letter Score - The dark blue cell in the board will be worth
            triple the amount, so any tile placed here will earn more points.
          </p>

          <p>
            Double Word Score - When a cell is light red in colour, it is a
            double word cell and these run diagonally on the board, towards the
            four corners. When a word is placed on these squares, the entire
            value of the word will be doubled.
          </p>

          <p>
            Triple Word Score - The dark red square is where the high points can
            be earned as this will triple the word score. Placing any word on
            these squares will boos points drastically. These are found on all
            four sides of the board and are equidistant from the corners.
          </p>

          <p>
            One Single Use - When using the extra point squares on the board,
            they can only be used one time. If a player places a word here, it
            cannot be used as a multiplier by placing another word on the same
            square.
          </p>

          <h3>Starting the Game</h3>
          
          <p>
            Each player will start their turn with seven tiles from the
            Skrabl bag. There are three options during any turn. The player
            can place a word, they can exchange tiles for new tiles or they can
            choose to pass. In most cases, players will try to place a word as
            the other two options will result in no score.
          </p>

          <p>
            When a player chooses to exchange tiles, they can choose to exchange
            one or all of the tiles they currently hold. After tiles are
            exchanged, the turn is over and players will have to wait until
            their next turn to place a word on the board.
          </p>

          <p>
            Players can choose to pass at any time. They will forfeit that turn
            and hope to be able to play the next time. If any player passes two
            times in a row, the game will end and the one with the highest score
            will win.
          </p>

          <h3>The First Word Score</h3>
          <p>
            When the game begins, the first player will place their word on the
            star spin in the centre of the board. The star is a double square
            and will offer a double word score. All players following will build
            their words off of this word, extending the game to other squares on
            the board.
          </p>

          <p>
            Play continues in a clockwise direction around the Skrabl board.
          </p>

          <h3>Replacing Skrabl Tiles</h3>
          <p>
            Once tiles are played on the board, players will draw new tiles to
            replace those. Players will always have seven tiles during the game.
          </p>

          <h3>The Fifty Point Bonus</h3>
          <p>
            Exciting rewards can come when players use all seven tiles to create
            a word on the board. When this happens, players will receive a 50
            point bonus, in addition to the value of the word. If the game is
            near the end and players are not holding seven tiles, they do not
            get the bonus for using all of their tiles. This is only collected
            for seven letter words placed.
          </p>

          <h3>The End of a Skrabl Game</h3>
          <p>
            Once all tiles are gone from the bag and a single player has placed
            all of their tiles, the game will end and the player with the
            highest score wins.
          </p>

          <h3>Tallying Skrabl Scores</h3>
          <p>
            When the game ends, each player will count all points that are
            remaining on their tiles that have not been played. This amount will
            be deducted from the final score.
          </p>

          <p>
            An added bonus is awarded to the player that ended the game and has
            no remaining tiles. The tile values of all remaining players will be
            added to the score of the player who is out of tiles to produce the
            final score for the game.
          </p>

          <p>
            The Skrabl player with the highest score after all final scores
            are tallied wins.
          </p>

          <h3>Accepted Skrabl Words</h3>
          <p>
            Any word that is found in a standard English dictionary can be used
            in the game of Skrabl. 
          </p>

          <p>
            There are some words that are not allowed to be played and these
            include suffixes, prefixes and abbreviations. Any word that requires
            the use of a hyphen or apostrophe cannot be played in the game. Any
            word that required the use of a capital letter is not allowed.
          </p>

          <p>
            When playing an English version of the game, foreign words are not
            allowed to be placed on the board. However, if the foreign word does
            appear in a standard English dictionary, it is allowed. The reason
            for this is due to the fact that the word is spoken enough and is
            considered part of the English language.
          </p>
          <div className="rulesModal__buttons">
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
    </Fade>
  );
};

export default RulesModal;
