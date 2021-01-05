import React from 'react'
import {Header} from '../components/Header'
import { Lolly } from '../components/lolly'
import Share from '../components/Share'

const Template = ({ pageContext: { top, middle, bottom, receiver, sender, message, id } }) => {

    return (
        <div>
            <Header />
            <div className="lollyFormDiv">

                <div>
                    <Lolly fillLollyTop={top} fillLollyMiddle={middle} fillLollyBottom={bottom} />
                </div>

                <Share id={id} receiver={receiver} sender={sender} message={message} />
            </div>
        </div>
    )
}

export default Template