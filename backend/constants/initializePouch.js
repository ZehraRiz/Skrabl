const initializePouch = (lang) => {
  let initialPouch = [];
  let i;
  if (lang == "en") {
    for (i = 0; i <= 1; i++)
      initialPouch.push({ id: initialPouch.length + 1, letter: "", points: 0 });
    for (i = 0; i <= 11; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "e",
        points: 1,
      });
    for (i = 0; i <= 8; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "a",
        points: 1,
      });
    for (i = 0; i <= 8; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "i",
        points: 1,
      });
    for (i = 0; i <= 7; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "o",
        points: 1,
      });
    for (i = 0; i <= 5; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "n",
        points: 1,
      });
    for (i = 0; i <= 5; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "r",
        points: 1,
      });
    for (i = 0; i <= 5; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "t",
        points: 1,
      });
    for (i = 0; i <= 3; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "l",
        points: 1,
      });
    for (i = 0; i <= 3; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "s",
        points: 1,
      });
    for (i = 0; i <= 3; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "u",
        points: 1,
      });
    for (i = 0; i <= 3; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "d",
        points: 2,
      });
    for (i = 0; i <= 2; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "g",
        points: 2,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "b",
        points: 2,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "c",
        points: 2,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "m",
        points: 2,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "p",
        points: 2,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "f",
        points: 4,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "h",
        points: 4,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "v",
        points: 4,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "w",
        points: 4,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "y",
        points: 4,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "k",
        points: 5,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "j",
        points: 8,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "x",
        points: 8,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "q",
        points: 10,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "z",
        points: 10,
      });
  } else if (lang === "tr") {
    for (i = 0; i <= 1; i++)
      initialPouch.push({ id: initialPouch.length + 1, letter: "", points: 0 });
    for (i = 0; i <= 7; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "e",
        points: 1,
      });
    for (i = 0; i <= 11; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "a",
        points: 1,
      });
    for (i = 0; i <= 6; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "i",
        points: 1,
      });
    for (i = 0; i <= 2; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "o",
        points: 2,
      });
    for (i = 0; i <= 4; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "n",
        points: 1,
      });
    for (i = 0; i <= 5; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "r",
        points: 1,
      });
    for (i = 0; i <= 4; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "t",
        points: 1,
      });
    for (i = 0; i <= 6; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "l",
        points: 1,
      });
    for (i = 0; i <= 2; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "s",
        points: 2,
      });
    for (i = 0; i <= 2; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "u",
        points: 2,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "d",
        points: 3,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "g",
        points: 5,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "b",
        points: 3,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "c",
        points: 4,
      });
    for (i = 0; i <= 3; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "m",
        points: 2,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "p",
        points: 5,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "f",
        points: 7,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "h",
        points: 5,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "v",
        points: 7,
      });

    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "y",
        points: 3,
      });
    for (i = 0; i <= 6; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "k",
        points: 1,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "j",
        points: 10,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "z",
        points: 4,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "ç",
        points: 4,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "ğ",
        points: 8,
      });
    for (i = 0; i <= 3; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "ı",
        points: 2,
      });
    for (i = 0; i <= 0; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "ö",
        points: 7,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "ş",
        points: 4,
      });
    for (i = 0; i <= 1; i++)
      initialPouch.push({
        id: initialPouch.length + 1,
        letter: "ü",
        points: 3,
      });
  }

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  return shuffle(initialPouch);
};
module.exports = initializePouch;
