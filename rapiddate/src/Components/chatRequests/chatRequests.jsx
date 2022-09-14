import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../database/firebase';
import { showUser } from '../../redux/User/UserSlice';
import ChatRequest from './chatRequest'


const ChatRequests = () => {
    const user = useSelector(showUser)
    const [chatRequests, setChatRequests] = useState([])
    useEffect(() => {
        const usersRef = collection(db, "Friends", user.uid, "Friends");
        const q = query(usersRef, where("friendStatus", "==", "pending"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let arr = []
            querySnapshot.forEach((doc) => {
                arr.push(doc.data())
            });
            setChatRequests(arr)
        });
        return () => unsub();
    }, [user]);
  return (
    <div>
        <h2>Chat Requests</h2>
        {chatRequests?.map((userObj) => {
            return (
                <ChatRequest key={userObj.uid} user2={userObj} />
            )
        })}
    </div>
  )
}

export default ChatRequests