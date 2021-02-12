import React, {useState, useEffect} from 'react'
import Wimmelbilder from './Wimmelbilder'
import Header from './Header'
import "toastify-js/src/toastify.css"
import swal from '@sweetalert/with-react'
import WelcomeMessage from './WelcomeMessage'
import WinMessage from './WinMessage'
import firebase from 'firebase'


const Game = (props) => {
  const [chars,setChars] = useState([])
  const charsRef = firebase.database().ref('chars')

  useEffect(() => {
    charsRef.on('value', (snapshot) => {
        let chars = snapshot.val()
        let charsArr = []
        for(let char in chars){
            charsArr.push({
                id: char,
                name: chars[char].name,
                active: chars[char].active,
                found: chars[char].found,
                xCoord: chars[char].xCoord,
                yCoord: chars[char].yCoord,
                xMin: chars[char].xMin,
                xMax: chars[char].xMax,
                yMin: chars[char].yMin,
                yMax: chars[char].yMax
            })
        }
        setChars(charsArr)
    })      
  },[])

  const updateChars = (chars) => {
    checkForWin(chars)
    setChars([...chars])
  }

  const checkForWin = (chars) => {
    const foundChars = chars.filter(char => char.found === true)

    if(foundChars.length === chars.length){
      props.setGameStatus("won")
      handleWin()
    }
  }

  const handleWin = () => {
    stopTimer()
    swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        content: <WinMessage />,
        button: "Submit to leaderboard"
    }).then(() => props.submitToLeaderboard())
  }

  if(props.gameStatus === "welcome"){
    swal({
        content: <WelcomeMessage />,
        button: "Start searching"
    }).then(() => startGame())
  }

  const startGame = () => {
    props.setGameStatus("in progress")
    startTimer()
  }

  /////////////////////////////////////////// STOPWATCH FUNCTIONS ///////////////////////////////////////////
  const [interval,handleInterval] = useState()

    const startTimer = () => {
        const startTime = Date.now()
        handleInterval(
            setInterval(
                () => {
                    const elapsedTime = Date.now() - startTime;
                    props.setDisplayTime(timeToString(elapsedTime))
                }
            ,1000)
        )
        console.log(interval)
    }

    const timeToString = (time) => {
        let diffInHrs = time / 3600000;
        let hh = Math.floor(diffInHrs)

        let diffInMin = (diffInHrs - hh) * 60
        let mm = Math.floor(diffInMin)

        let diffInSec = (diffInMin - mm) * 60
        let ss = Math.floor(diffInSec)

        let formattedMM = mm.toString().padStart(2,"0")
        let formattedSS = ss.toString().padStart(2,"0")

        return `${formattedMM}:${formattedSS}`
    }

    const stopTimer = () => {
        clearInterval(interval)
    }

  return (
    <div>
        <div className="App">
            <Header 
                chars = {chars}
                updateChars = {updateChars}
                displayTime = {props.displayTime}
                startTimer = {startTimer}
                stopTimer = {stopTimer}
            />
            <Wimmelbilder
                chars = {chars}
                updateChars = {updateChars}
            />
        
        </div>
    </div>
  )
}

export default Game;
