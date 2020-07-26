let initialPouch = [];
let i;

for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "", points: 0 });
for (i = 0; i <= 11; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "E", points: 1 });
for (i = 0; i <= 8; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "A", points: 1 });
for (i = 0; i <= 8; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "I", points: 1 });
for (i = 0; i <= 7; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "O", points: 1 });
for (i = 0; i <= 5; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "N", points: 1 });
for (i = 0; i <= 5; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "R", points: 1 });
for (i = 0; i <= 5; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "T", points: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "L", points: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "S", points: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "U", points: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "D", points: 2 });
for (i = 0; i <= 2; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "G", points: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "B", points: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "C", points: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "M", points: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "P", points: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "F", points: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "H", points: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "V", points: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "W", points: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "Y", points: 4 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "K", points: 5 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "J", points: 8 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "X", points: 8 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "Q", points: 10 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "Z", points: 10 });

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

initialPouch =  shuffle(initialPouch)
module.exports =  initialPouch;
