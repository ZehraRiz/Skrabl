import React from 'react'

export const printWordWithBlankTiles = (words) => {
    let w = []
    words = words.map((newWord) => {
        let word = newWord.squares.map(square => {
            if (square.tile.letter === "") {
                return "_"
            }
            else return square.tile.letter
        })
        w.push(word)
    })

    w = w.map(x => {
        x = x.join("")
        return x
    })
    return w
}
