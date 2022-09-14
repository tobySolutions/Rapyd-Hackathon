import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { showUser } from '../../redux/User/UserSlice';
import { db } from '../../database/firebase';

const ChatRequest = ({user2}) => {
    const user = useSelector(showUser)
    const handleRequest = async () => {
        await updateDoc(doc(db, "Friends", user.uid, "Friends", user2.uid), {
            ...user2,
            friendStatus: true,
        });
        
    }
    return (
        <div>
            <div>
                Picture
            </div>
            <div>
                {/* <h4>{user2.name}</h4>
                <p>{user2.description}</p> */}
            </div>
            <button onClick={handleRequest}>Accept</button>
            <CloseIcon />
        </div>
    )
}

export default ChatRequest