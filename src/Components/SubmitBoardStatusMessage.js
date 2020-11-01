import React from 'react';


function SubmitBoardStatusMessage(props) {
    return (
        <div className="submit-board-status">
            <p style={{color: props.statusSuccessful ? 'green' : 'red'}}>{props.statusMessage}</p>
        </div>
    )
}

export default SubmitBoardStatusMessage;