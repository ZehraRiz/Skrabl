
export const findWordsOnBoard = (boardState) => {
    let dir = 'across',
        wordStart = '',
        words = [],
        letters = [];
    
    // Scan all rows for words across

    for (var row = 0; row < 15; row++) { 
        for (var col = 0; col < 15; col++) { 
            var currentSquare = boardState[col + ((row * 15))];
            if (!currentSquare.hasOwnProperty('tile')) {  
                if (wordStart !== ''){
                    if (letters.length > 1) {
                        words.push({word: letters.join(''), start: wordStart, dir: dir});
                        console.log(words);
                    }
                }
                wordStart = '';
                letters = [];
            } else {
                letters.push(currentSquare.tile.letter);   
                if (wordStart !== '' && col === 14 ) {
                    words.push({word: letters.join(''), start: wordStart, dir: dir});
                } else if (wordStart == '') {
                    wordStart = `${row}-${col}`;
                }
            }
        }
    }

    // Scan all columns for words down
    for (var col = 0; col < 15; col++) {
        for (var row = 0; row < 15; row++) { 
            var currentSquare = boardState[col + ((row * 15))];
            if (!currentSquare.hasOwnProperty('tile')) { 
                if (wordStart !== ''){
                    if (letters.length > 1) {
                        words.push({word: letters.join(''), start: wordStart, dir: dir});
                    }
                }
                wordStart = '';
                letters = [];
            } else {
                letters.push(currentSquare.tile.letter);    
                if (wordStart !== '' && row === 14 ) {
                    words.push({word: letters.join(''), start: wordStart, dir: dir});
                } else if (wordStart == '') {
                    wordStart = `${row}-${col}`;
                }
            }
        }
    }
    return words;
}

