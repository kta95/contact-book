import React from 'react'

const Persons = ({ name, number, Personkey, deleteHandler }) => {
    console.log('key key', Personkey)
    return (
        <div>{name} {number}
        <button onClick={deleteHandler}> delete </button> <br/></div>
    )
    }
export default Persons