import React from 'react'

const Char = (props) => {
    const char = props.char
    let activeClass = ""
    let found = ""

    if(char.active){
        activeClass = "charActive"
    } 
    
    if(char.found){
        found = "found"
    }

    return (
        <div key={char.name} className={`char ${activeClass} ${found}`} onClick={(e) => props.changeActiveStatus(e)}>
            {char.name}
        </div>
    )
}

export default Char