import React, { useEffect, useState } from "react";
// import Img from "../image1.jpg";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../database/firebase";
import DoneAllIcon from '@mui/icons-material/DoneAll';


const User = ({ user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper `}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
          <div className="user_detail">
            <div className="avatar"></div>
            {/* <img src={user.avatar || Img} alt="avatar" className="avatar" /> */}
            <div className="sentMessage">
              <h4>{user.name}</h4>
              {data && (
          <p className="truncate">
            {data.from === user1 ? <DoneAllIcon style={{fontSize:".9rem"}} /> : null}
            {data.text}
          </p>
        )}

            </div>
            
          </div>
        </div>
        <div className="userStatus"></div>
        <h4>2:30</h4>
        {data?.from !== user1 && data?.unread && (
          <small className="unread">1</small>
        )}
      </div>
    </>
  );
};

export default User;
