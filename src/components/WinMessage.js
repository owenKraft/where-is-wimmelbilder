import React from 'react'

const WinMessage = () => {
    return (
        <div className="modal-content">
            <h1>You found everyone!</h1>
            <div className="modal-message-body">
                <p>
                    You found all of our friends! Enter you name below, and we'll add your name and time to our leaderboard!
                </p>
            </div>
            <input id="name-input" type="text" placeholder="Enter your name here (or leave blank to be anonymous)" maxLength="50"></input>
        </div>
    )
}

export default WinMessage