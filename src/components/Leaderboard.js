import React, { useState,useEffect } from 'react'
import image from '../resources/wimmelbilder.jpg'
import Emoji from 'a11y-react-emoji';
import firebase from 'firebase'

const Leaderboard = (props) => {
    const [leaderBoardList,setLeaderBoardList] = useState([])
    const playerTimesRef = firebase.database().ref('playerTimes')

    useEffect(() => {
        playerTimesRef.on('value', (snapshot) => {
            let playerTimes = snapshot.val()
            let leaderBoard = []
            for(let time in playerTimes){
                leaderBoard.push({
                    id: time,
                    name: playerTimes[time].name,
                    time: playerTimes[time].time
                })
            }
            leaderBoard.sort((a,b) => (a.time > b.time) ? 1 : -1)
            setLeaderBoardList(leaderBoard)
        })      
    },[])

    const redirectToHome = () => {
        window.location.href = "/where-is-wimmelbilder"
    }

    return(
        <div className="wrapper">
            <img className="image-banner" src={image} alt="sylvan-hill-header"></img>
            <div className="leaderboard-header">
                <h1>Leaderboard <Emoji symbol="🏆" label="trophy" /></h1>
                <button className="leaderboard-btn" onClick={redirectToHome}>Play again</button>

            </div>
            <div className="leaderboard-list-header">
                <h2>Name</h2>
                <h2>Time</h2>
            </div>
            <div className="leaderboard-list">
                {leaderBoardList.map((submission) => {
                    return (
                        <div key={submission.id} className="leaderboard-list-item">
                            <div>{submission.name}</div>
                            <div>{submission.time}</div>
                        </div>
                    )
                })}
            </div>
            <div className="leaderboard-btn-div">
                <button className="leaderboard-btn" onClick={redirectToHome}>Play again</button>
            </div>
        </div>
    )
}

export default Leaderboard