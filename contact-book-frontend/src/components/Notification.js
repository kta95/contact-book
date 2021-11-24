import React from "react";

const Notification = ({ message }) => {
    console.log('noti', message)
    if (message == null) {
        return null;
    }

    return (
        <div className="success">
            {message}
        </div>
    )
}   

export default Notification