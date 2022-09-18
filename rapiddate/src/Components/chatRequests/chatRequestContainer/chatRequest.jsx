import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { showUser } from '../../../redux/User/UserSlice';
import { db } from '../../../database/firebase';
import style from './chatRequest.module.css'


const ChatRequest = ({user2}) => {
    const user = useSelector(showUser)
    const handleRequest = async () => {
        await updateDoc(doc(db, "Friends", user.uid, "Friends", user2.uid), {
            ...user2,
            friendStatus: true,
        });
        
    }
    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                <img className={style.image} src={user?.url} alt="" />
            </div>
            <div className={style.info}>
                <h4>{user2?.name}</h4>
                <p>{user2?.description}</p>
            </div>
            <button style={{cursor:'pointer'}} className={style.button} onClick={handleRequest}>Accept</button>
            <CloseIcon className={style.icon} />
        </div>
    )
}

export default ChatRequest