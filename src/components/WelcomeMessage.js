import React from 'react'

const WelcomeMessage = () => {
    return (
        <div className="modal-content">
            <h1>Welcome to Sylvan Hill!</h1>
            <div className="modal-message-body">
                <p>
                    It's been a busy day on the slope and we've lost a few of our friends. If you could find them for us, it'd be greatly appreciated!
                </p>
                <ul>
                    <li>Yeti</li>
                    <li>Rooster</li>
                    <li>Mouse</li>
                </ul>
                <p>
                    When you've found our missing friends, just <strong>click on them</strong> so we know to find them.
                </p>
            </div>
        </div>
    )
}

export default WelcomeMessage