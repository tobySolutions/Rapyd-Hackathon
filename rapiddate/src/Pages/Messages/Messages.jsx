import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../database/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import style from './whatsapp.module.css'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../../Components/components/User";
import MessageForm from "../../Components/components/MessageForm";
import Message from "../../Components/components/Message";
import { useSelector } from "react-redux";
import { showUser } from "../../redux/User/UserSlice";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Link} from "react-router-dom"

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const[toggle, setToggle] = useState(false)
  const userObj = useSelector(showUser)
  const user1 = userObj.uid

  // Gets List of all Users who are Friends with the Current User
  useEffect(() => {
    const usersRef = collection(db, "Friends",user1, "Friends");
    const q = query(usersRef,where("friendStatus", "==", true));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let arr = []
      querySnapshot.forEach((doc) => {
        arr.push(doc.data())
      });
      setUsers(arr)
    });
    return () => unsub();
  }, [user1]);

  const selectUser = async (user) => {
    setToggle(true)
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
  };
  return (
    <div className={style.chat}>
      <div className={` ${style.sidebar} ${toggle ? style.display:  '' }`}>  
      {/* Header */}
        <div className={style.header}>
          <div className={style.chatheaderLeft}>
            <Link to="/dashboard">
              <KeyboardBackspaceIcon style={{width: "20px"}} className={style.icon} />
            </Link>
            <div className={style.avatar}></div>
          </div>
          <div className={style.chatheaderRight}>
            <MoreVertIcon className={style.icon}  />
          </div>
        </div>
        {/* Search */}
        <div className={style.sidebarSearch}>
          <div className={style.sidebarSearchContainer}>
            <BsSearch className={style.sidebarIcon} />
            <input type="text" placeholder='Search for a Chat' />
          </div>
        </div>
        {/* Chats */}
        <div className={style.sidebarChats}>
          {users?.map((user) => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          ))}
        </div>
        
      </div>
      <div className={`${style.messageContainer} ${toggle ? '' : style.display }`}>
          {chat ? ( 
              <>
                <div className={style.header}>
                  <div className={style.chatTitle}>
                    <BsArrowLeft onClick={() => setToggle(false)} className={style.messageBackArrow} />
                      <div className={style.avatar}></div>
                      <div className={style.messageHeaderContent}>
                          <h4>{chat.name}</h4>
                          <p>{chat.isOnline ? 'Online' : ''}</p>
                      </div>
                  </div>
                  <div className={style.chatHeaderRight}>
                      <BsSearch className={style.icon} />
                      <MoreVertIcon className={style.icon} />
                  </div>
                </div>
                  <div className={style.messageContent}>
                    {msgs?.length
                      ? msgs.map((msg, i) => (
                          <Message key={i} msg={msg} user1={user1} />
                        ))
                      : null}
                  </div>
                  <MessageForm
                    handleSubmit={handleSubmit}
                    text={text}
                    setText={setText}
                    setImg={setImg}
                  />
              </>
            ): (
            <div className={style.convo}>
              <div>
                <div className={style.convobox}></div>
                <h3 className={style.emptyConvo}>Start a Conversation with people around you</h3>   
              </div>
            </div>
          )}
      </div>  
    </div>
  );
};

export default Messages;
