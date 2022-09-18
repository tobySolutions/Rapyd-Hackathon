import React from 'react'

import ChatRequestContainer from './chatRequestContainer/ChatRequestContainer';
import styles from './chatRequests.module.css'
import DateLocations from './DateLocations/DateLocations';


const ChatRequests = () => {
    return (
        <div className={styles.chatRequests}>
            <ChatRequestContainer />
            <DateLocations />
        </div>
    )
}

export default ChatRequests