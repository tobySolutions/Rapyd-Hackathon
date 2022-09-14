import React, { useRef, useEffect } from "react";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import style from '../../Pages/Messages/whatsapp.module.css'


const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const handleTime = () => {
    let data= new Date(msg.createdAt.toDate())
    let hrs = data.getHours()
    let mins = data.getMinutes()
    if(hrs<=9)
      hrs = '0' + hrs
    if(mins<10)
      mins = '0' + mins
    const postTime= hrs + ':' + mins
    return postTime
  }
  const iconStyle={
    width:'15px',
    marginTop:"0px",
    textAlign:"center",
  }
  return (
    <p 
    ref={scrollRef} 
    className={`${style.chatMessage} ${msg?.from === user1 ? style.chatSent : ''}`}>
      {msg.text}
      <span 
      className={style.chatTimeStamp}>
        {handleTime()}
        {msg?.from === user1 ? <DoneAllIcon style={iconStyle} /> : ''}
      </span>
    </p>
  );
};

export default Message;
