
export const findWordsOnBoard = (boardState) => {
    let wordStart = '',
        words = [],
        letters = [], 
        dirs = ['across', 'down'];

    const checkSquare = (dir, x, y) => {
        let [row, col] = dir === 'across' ? [x, y] : [y, x];
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
            if (wordStart !== '' && col === 14 ) {                                 
                words.push({word: letters.join(''), start: wordStart, dir: dir});           
            } else if (wordStart == '') {
                wordStart = `${row}-${col}`;  
            }
        }
    }
    dirs.forEach(dir => {
        for (var x = 0; x < 15; x++) { 
            for (var y = 0; y < 15; y++) { 
                checkSquare(dir, x, y);
            }
        }
    });   
    return words;
}

  
