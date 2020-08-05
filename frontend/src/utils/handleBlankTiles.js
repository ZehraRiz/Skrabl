import React from 'react'

export const handleBlankTiles = (newWords, setConfirmMessage) => {
    newWords.map((newWord) => {
        newWord.squares.map(square => {
            if (square.tile.letter === "") {
                setConfirmMessage({
                    type: "blankTile",
                    message: "The word you made: "
                })
            }
        })
    })
}


export const printWordWithBlankTiles = (words) => {
    let noBlankTiles = 0
    let w = []
    words = words.map((newWord) => {
        let word = newWord.squares.map(square => {
            if (square.tile.letter === "") {
                noBlankTiles ++
                return "_"
            }
            else return square.tile.letter
        })
        w.push(word)
    })

    w = w.map(x => {
        x = x.join(" ")
        return x
    })
    return {
        word: w,
        noBlankTiles: noBlankTiles
    }
}


export const fillInBlankTiles = (turnWords, toFill) => {
    let completeWord = []
    let i = 0;
    turnWords.map(newWord => {
        newWord.squares.map(square => {
        if (square.tile.letter === "") {
            completeWord.push(toFill[i])
            i++
        } else {
            completeWord.push(square.tile.letter)
        }
    })
    })
    completeWord = completeWord.join("")
    turnWords[0].word = completeWord;
    return turnWords
}

