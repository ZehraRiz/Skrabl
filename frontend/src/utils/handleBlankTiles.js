import React from 'react'

export const handleBlankTiles = (newWords, setConfirmMessage) => {
    newWords.map((newWord) => {
        newWord.squares.map(square => {
            if (square.tile.letter === "") {
                console.log("encountered blank letter")
                setConfirmMessage({
                    type: "blankTile",
                    message: "The word you made: "
                })
            }
        })
    })
    return (
        <div>

        </div>
    )
}


