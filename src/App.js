import React, {useState} from 'react'
import './App.css'
import { HashRouter, Switch, Route, useHistory} from "react-router-dom"
import "toastify-js/src/toastify.css"
import Leaderboard from './components/Leaderboard'
import firebase from 'firebase'
import Game from './components/Game'


function App() {
  const [gameStatus,setGameStatus] = useState("welcome")
  const [playerInfo,setPlayerInfo] = useState()
  const [displayTime,setDisplayTime] = useState("00:00")
  // const history = useHistory();

  const submitToLeaderboard = () => {
    let name = document.getElementById("name-input").value

    if(name === ""){
      name = "Anonymous"
    }

    const playerTime = {name: name,time: displayTime}
    setPlayerInfo(playerTime)
    const playerTimesRef = firebase.database().ref('playerTimes')
    playerTimesRef.push(playerTime)

    // history.push(`/leaderboard`)
    window.location.href = "/where-is-wimmelbilder/#/leaderboard";
  }



  return (
    <div>
      <HashRouter basename="/wimmelbilder">
        <Switch>
          <Route 
            path="/" exact
            render={(props) => (
              <Game 
                displayTime = {displayTime}
                setDisplayTime = {setDisplayTime}
                gameStatus = {gameStatus}
                setGameStatus = {setGameStatus}
                submitToLeaderboard = {submitToLeaderboard}
              />
            )}
          />
          <Route 
            path="/leaderboard" exact
            render={(props) => (
              <Leaderboard
                playerInfo = {playerInfo}
              />
            )}
          />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
