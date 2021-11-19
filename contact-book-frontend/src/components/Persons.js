import React from 'react'

const Persons = ({ name, number, key, deleteHandler }) => (
    <div key={key} >{name} {number}
    <button onClick={deleteHandler}> delete </button> <br/></div>
)

export default Persons