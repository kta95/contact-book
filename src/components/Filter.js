import React from 'react'

const Filter = ({ word, eventHandler }) => {

    return (
        <div>
            filter shown with<input value={word} onChange={eventHandler} />
        </div>
    )
}

export default Filter