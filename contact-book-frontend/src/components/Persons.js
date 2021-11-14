import React from 'react'

const Persons = ({ nameToShow }) => {
    const showNames = nameToShow.map( person => <div key={person.name} >{person.name} {person.number}<br/> </div> )
    return (
        <>
            {showNames}
        </>
    )
}

export default Persons