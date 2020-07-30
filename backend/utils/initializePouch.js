const startingTiles = require("../assets/startingTiles");
const shuffle = require("../utils/shuffle");

const initializePouch = (lang) => {
  let initialPouch = [];
  let i;
  const tiles = startingTiles[lang];
  Object.keys(tiles).forEach((key) =>
    tiles[key].forEach((tile) => {
      for (let i = 0; i < key; i++) {
        const newTile = { ...tile, id: tile.letter + i };
        initialPouch.push(newTile);
      }
    })
  );
  const shuffled = shuffle(initialPouch);
  return shuffled;
};

module.exports = initializePouch;
