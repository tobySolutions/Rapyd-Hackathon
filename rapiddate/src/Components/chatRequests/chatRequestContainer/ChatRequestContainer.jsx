import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { showUser } from '../../../redux/User/UserSlice'
import { db } from '../../../database/firebase'
import ChatRequest from './chatRequest'
import style from './chatRequestContainer.module.css'

const ChatRequestContainer = () => {
  const user = useSelector(showUser)
  const [chatRequests, setChatRequests] = useState([1,2,3,4,5,6,7,])
  // useEffect(() => {
  //   const usersRef = collection(db, 'Friends', user.uid, 'Friends')
  //   const q = query(usersRef, where('friendStatus', '==', 'pending'))
  //   const unsub = onSnapshot(q, querySnapshot => {
  //     let arr = []
  //     querySnapshot.forEach(doc => {
  //       arr.push(doc.data())
  //     })
  //     setChatRequests(arr)
  //   })
  //   return () => unsub()
  // }, [user])
  return (
    <div className={style.chatRequestContainer}>
      <div className={style.innerContainer}>
        <h2 className={style.heading}>Chat Requests</h2>
        {chatRequests?.map(userObj => {
          return <ChatRequest key={userObj.uid} user2={userObj} />
        })}
      </div>
    </div>
  )
}

export default ChatRequestContainer
