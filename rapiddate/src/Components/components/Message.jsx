import moment from "moment";
import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import DoneAllIcon from '@mui/icons-material/DoneAll';


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
  handleTime()
  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    > 
      <div  className={`response ${msg.from === user1 ? "me" : "friend"}`}>
        <div className="responseContainer">
          <p className="textMessage"> 
            {msg.text} 
          <sub className="timeSent">
            {handleTime()}
            <DoneAllIcon style={{fontSize:"15px", marginLeft: "5px"}} className="doneIcon"/>
          </sub>
          </p>
        </div>
      </div>
    </div>

    
  );
};

export default Message;
