import React from 'react'

const Char = (props) => {
    let char = props.char
    let activeClass = ""
    let found = ""

    if(char !== undefined && char.active){
        activeClass = "charActive"
    } 
    
    if(char !== undefined && char.found){
        found = "found"
    }
    let charDiv

    if(char === undefined){
        charDiv = ""
    } else {
        charDiv =   <div key={char.name || ""} className={`char ${activeClass} ${found}`} onClick={(e) => props.changeActiveStatus(e)}>
                        {char.name || ""}
                    </div>
    }

    return (
        <div>
            {charDiv}
        </div>
        
    )
}

export default Char