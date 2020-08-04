import React from 'react'

export const handleBlankTiles = ( newWords, setConfirmMessage ) => {
    newWords.map((newWord) => {
        newWord.squares.map(square => {
            if (square.tile.letter === "") {
                console.log("encountered blank letter")
                setConfirmMessage({
                    type: "blankTile",
                    message: `Enter a letter for the blank tile`,
                    newWords: newWords
    });
            }
        })
    })
    return;
}


