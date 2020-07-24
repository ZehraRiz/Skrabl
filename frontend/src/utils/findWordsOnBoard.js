import React, { useState, useEffect } from "react";
import { bonusSquareIndices } from "../assets/bonusSquareIndices";
import { letterValues } from "../assets/letterValues";


/* run through board (indices of squares)

 if encounter square with a tile {
     
     test all rows across
     if found {
         add word object to wordsOnBoard
     }
     test all cols down 
     if found {
         add word object to wordsOnBoard
     }
    return wordsOnBoard
 } 
*/

export const findWordsOnBoard = (boardState) => {
    var row = 0;
    var col = 0;
    var wordStart = '';
    var words = [];
    var letters = [];
    
    for (var row = 0; row < 15; row++) { //  replace i and j var names with row and col!!!!!
        for (var col = 0; col < 15; col++) { 
            var currentSquare = boardState[col + ((row * 15))];
            if (!currentSquare.hasOwnProperty('tile')) {  //  Maybe convert grid index to coords elsewhere? ...need a more reliable way of calculating moved rows...0 index screws it up.
                if (wordStart !== ''){
                    if (letters.length > 1) {
                        words.push({word: letters.join(''), start: wordStart});
                        console.log(words);
                    }
                }
                wordStart = '';
                letters = [];
            } else {
                letters.push(currentSquare.tile.letter);    //  need a more reliable way of calculating moved rows...0 index screws it up.
                if (wordStart !== '' && col === 14 ) {
                    words.push({word: letters.join(''), start: wordStart});
                } else if (wordStart == '') {
                    wordStart = `${row}-${col}`;
                }
            }// it's still not adding the letter from the last col 14...and start seems to be the second letter.
        }
    }

    for (var col = 0; col < 15; col++) { //  replace i and j var names with row and col!!!!!
        for (var row = 0; row < 15; row++) { 
            var currentSquare = boardState[col + ((row * 15))];
            if (!currentSquare.hasOwnProperty('tile')) {  //  Maybe convert grid index to coords elsewhere? ...need a more reliable way of calculating moved rows...0 index screws it up.
                if (wordStart !== ''){
                    if (letters.length > 1) {
                        words.push({word: letters.join(''), start: wordStart});
                    }
                }
                wordStart = '';
                letters = [];
            } else {
                letters.push(currentSquare.tile.letter);    //  need a more reliable way of calculating moved rows...0 index screws it up.
                if (wordStart !== '' && row === 14 ) {
                    words.push({word: letters.join(''), start: wordStart});
                } else if (wordStart == '') {
                    wordStart = `${row}-${col}`;
                }
            }// it's still not adding the letter from the last col 14...and start seems to be the second letter.
        }
    }




    /*
    for (var i = 0; i < 15; i++) { 
        if (!boardState[i].hasOwnProperty('tile')) {
            if (wordStart !== ''){
                if (letters.length > 1) {
                    words.push({word: letters.join(''), start: wordStart});
                }
            }
            wordStart = '';
            letters = [];
        } else {
            letters.push(boardState[i].tile.letter);
            if (wordStart !== '' && i === 14 ) {
                words.push({word: letters.join(''), start: wordStart});
            } else if (wordStart == '') {
                wordStart = `${i}-${col}`;
            }
        }
    }*/
    return words;
}

