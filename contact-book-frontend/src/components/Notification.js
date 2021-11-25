import React from "react";

const Notification = ({ message }) => {
    console.log('noti', message)
    if (message == null) {
        return null;
    }
    let flag = (message.includes('removed')) ? 'error' : 'success';
    
    return (
        <div className={flag}>
            {message}
        </div>
    )
}   

export default Notification