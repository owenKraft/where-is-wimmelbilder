import React from 'react'
import Char from './Char'
import image from '../resources/GitHub-Mark-32px.png'

const Header = (props) => {
    const changeActiveStatus = (e) => {
        let charsCopy = props.chars
        charsCopy.forEach(char => char.active = false)

        const index = charsCopy.findIndex(char => char.name === e.target.innerText)
        charsCopy[index].active = true

        console.log(charsCopy)
        props.updateChars(charsCopy)
    }

    return (
       <div className="header">

            <div className="charSelector">
                <span>
                    <strong>Find the following:</strong>
                </span>
                
                <div className="charOptions">
                    <Char 
                        char={props.chars[0]}
                        changeActiveStatus = {changeActiveStatus}
                    />
                    <Char
                        char={props.chars[1]}
                        changeActiveStatus = {changeActiveStatus}
                    />
                    <Char
                        char={props.chars[2]}
                        changeActiveStatus = {changeActiveStatus}
                    />
                </div>
            </div>

            <div>
                {props.displayTime}
            </div>

           <div className="github-link">
               <img className="github-icon" src={image} alt="GitHub icon"></img> <a href="https://github.com/owenKraft/where-is-wimmelbilder" target="_blank" rel="noreferrer" >GitHub</a>
           </div>
       </div>
    )
}

export default Header