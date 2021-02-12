import React from 'react'
import image from '../resources/wimmelbilder.jpg'
import toast from './Toast'

const Wimmelbilder = (props) => {
    const getCoords = (e) => {
        const x = e.pageX
        const y = e.pageY

        console.log("pageX = " + x + ", pageY = " + y)
        return {x,y}
    }

    const checkForHit = (e) => {
        const clickResult = checkCoords(e)

        if(clickResult.result){
            console.log("hit!")
            let charsCopy = props.chars
            const foundChar = charsCopy[getCharIndex(clickResult.character)]
            foundChar.found = true
            console.log(charsCopy)
            toast("success",`You found the ${foundChar.name}!`)
            props.updateChars(charsCopy)
        } else {
            console.log("miss!")
            toast("info","Keep looking!")
        }

        console.log(clickResult)
    }

    const checkCoords = (e) => {
        const coords = getCoords(e)
        const pixelBuffer = 2
        let charsCopy = props.chars
        let result = false
        let character

        charsCopy.forEach(char => 
            {            
                if(
                    (coords.x >= char.xMin - pixelBuffer && coords.x <= char.xMax + pixelBuffer) &&
                    (coords.y >= char.yMin - pixelBuffer && coords.y <= char.yMax + pixelBuffer)
                )
                {
                    result = true
                    character = char.name
                }
            }  
        )

        return {result,character}
    }

    const getCharIndex = (name) => {
        const index = props.chars.findIndex(char => char.name === name)
        return index
    }

    


    return (
        <img className="wimmelbilder" src={image} alt="wimmelbilder" onClick={(e) => checkForHit(e)}></img>
    )
}

export default Wimmelbilder