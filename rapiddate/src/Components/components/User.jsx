import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../database/firebase";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import style from '../../Pages/Messages/whatsapp.module.css'


const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, [user1, user2]);

  const firstLetterUpper = (string) => {
    let newString = string
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function(c) {
        return c.toUpperCase();
      });
    return newString;
  }

  const convertToSentenceCase = (string) => {
    let newText = firstLetterUpper(string);
    return newText
  }
  const handleTime = () => {
    let date= new Date(data?.createdAt.toDate())
    let hrs = date.getHours()
    let mins = date.getMinutes()
    if(hrs<=9)
      hrs = '0' + hrs
    if(mins<10)
      mins = '0' + mins
    const postTime= hrs + ':' + mins
    return postTime
  }

  return (
    <>
      <div className={style.sidebarChat} onClick={() => selectUser(user)}>
        <div className={style.chatAvatar}></div>
        <div className={style.chatInfo}>
            <h4>{user.name ? convertToSentenceCase(user.name) : ''}</h4>
            <p>
              {data?.from === user1 ? <DoneAllIcon style={{fontSize:".9rem"}} /> : null}
              {data?.text}
            </p>
        </div>
        <div className={style.time}>
            <p>{data?.createdAt ? handleTime() : ''}</p>
        </div>
            <p>
              {data?.from !== user1 && data?.unread && (
                <p className={style.unread}>1</p>
              )}
            </p>
      </div>
    </>
  );
};

export default User;
