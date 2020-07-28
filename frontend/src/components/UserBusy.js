import React from 'react'

const UserBusy = ({ socket }) => {
    socket.on('retrivedGame', (data) => {
        console.log(data)
    })

    //retrived game setup
    //join it to game room when sent back 
    return (
        <div>
            <h5>You are already in a game</h5>
        </div>
    )
}

export default UserBusy
