import React from 'react'
// import "../css/Result.css"
export interface ResultProps {
    id: string;
    receiver: string;
    message: string;
    sender: string;
}
const Share: React.FC<ResultProps> = ({ id, receiver, message, sender }) => {
    console.log(receiver)
    return (
        <div>
            <h4>Share lolly with this link:</h4>
            <h3>{`d39nzanfgybe3.cloudfront.net/${id}`}</h3>
            <div className="result__details">
                <p className="reciever">To____{receiver}</p>
                <p className="message">MSG____{message}</p>
                <p className="sender">From____{sender}</p>
            </div>
        </div>
    )
}

export default Share