let initialPouch = [];
let i;

for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "", point: 0 });
for (i = 0; i <= 11; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "E", point: 1 });
for (i = 0; i <= 8; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "A", point: 1 });
for (i = 0; i <= 8; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "I", point: 1 });
for (i = 0; i <= 7; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "O", point: 1 });
for (i = 0; i <= 5; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "N", point: 1 });
for (i = 0; i <= 5; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "R", point: 1 });
for (i = 0; i <= 5; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "T", point: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "L", point: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "S", point: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "U", point: 1 });
for (i = 0; i <= 3; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "D", point: 2 });
for (i = 0; i <= 2; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "G", point: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "B", point: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "C", point: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "M", point: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "P", point: 2 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "F", point: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "H", point: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "V", point: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "W", point: 4 });
for (i = 0; i <= 1; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "Y", point: 4 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "K", point: 5 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "J", point: 8 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "X", point: 8 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "Q", point: 10 });
for (i = 0; i <= 0; i++) initialPouch.push({ id: initialPouch.length + 1, letter: "Z", point: 10 });

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

initialPouch =  shuffle(initialPouch)
module.exports =  initialPouch;
