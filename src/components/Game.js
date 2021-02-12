import React, {useState, useEffect} from 'react'
import Wimmelbilder from './Wimmelbilder'
import Header from './Header'
import "toastify-js/src/toastify.css"
import swal from '@sweetalert/with-react'
import WelcomeMessage from './WelcomeMessage'
import WinMessage from './WinMessage'
import firebase from 'firebase'


const Game = (props) => {
  const [chars,setChars] = useState(
    []
  //   [
  //     {
  //       name: "Yeti",
  //       active: true,
  //       found: false,
  //       xCoord: 925,
  //       yCoord: 545,
  //       xMin: 911,
  //       xMax: 967,
  //       yMin: 503,
  //       yMax: 599
  //     },
  //     {
  //       name: "Rooster",
  //       active: false,
  //       found: false,
  //       xCoord: 643,
  //       yCoord: 1366,
  //       xMin: 612,
  //       xMax: 701,
  //       yMin: 1333,
  //       yMax: 1395
  //     },
  //     {
  //       name: "Mouse",
  //       active: false,
  //       found: false,
  //       xCoord: 1517,
  //       yCoord: 1168,
  //       xMin: 1501,
  //       xMax: 1541,
  //       yMin: 1155,
  //       yMax: 1195
  //     },
  // ]
  )
  const charsRef = firebase.database().ref('chars')

  const [charsTest,setCharsTest] = useState([])

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
        console.log(charsArr)
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
                // chars = {charsTest}
                updateChars = {updateChars}
                displayTime = {props.displayTime}
                startTimer = {startTimer}
                stopTimer = {stopTimer}
            />
            <Wimmelbilder
                chars = {chars}
                // chars = {charsTest}
                updateChars = {updateChars}
            />
        
        </div>
    </div>
  )
}

export default Game;
