import React from 'react'

const Stopwatch = (props) => {

    return (
        <div>
            {props.displayTime}
            <button onClick={props.startTimer}>Start</button>
            <button onClick={props.stopTimer}>Stop</button>
        </div>
    )
}

export default Stopwatch