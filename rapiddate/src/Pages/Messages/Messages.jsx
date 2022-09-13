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
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import style from './Messages.module.css'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../../Components/components/User";
import MessageForm from "../../Components/components/MessageForm";
import Message from "../../Components/components/Message";
import './message.css'
import { useSelector } from "react-redux";
import { showUser } from "../../redux/User/UserSlice";
import { BsArrowLeft, BsOption, BsSearch } from "react-icons/bs";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [showPending, setShowPending] = useState(false)
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [pending, setPending] = useState([])
  const [friends, setFriends] = useState([])
  const [active, setActive] = useState(false)
  const user = useSelector(showUser)
  const user1 = user.uid

  useEffect(() => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("uid", "!=", user1));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      });
      setUsers(users )
    });
    return () => unsub();
  }, [user1]);

  useEffect(() => {
    const pendingRef = collection(db, "Pending", user1, "pending")
    const friendRef = collection(db, "Friends", user1, "friends")
    const getStates = (setState, ref) => {
      const q = query(ref)
      onSnapshot(q, (querySnapshot) => {
        let arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        setState(arr);
      });
    }
    getStates(setPending, pendingRef)
    getStates(setFriends, friendRef)
  }, [])
    

  const selectUser = async (user) => {
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

  const messageNewUser = async (user) => {
      await addDoc(collection(db, "Pending", user1, "pending"), user);
  }

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
      <div className={style.user}>  
        <div className={style.heading}>
          <BsArrowLeft />
          <div className={style.img}></div>
          {user.name}
        </div>
        <div className={style.body}>
          <div onClick={() => setShowPending(!showPending)} className={style.pendingContainer}>
            {showPending ? (
              <div className={style.pending}>
                <BsArrowLeft />
                <p>Go Back</p>
              </div>
            ) :
              <div className={style.pending}>
                <p className={style.pendingText}>Pending Messages</p>
                <div className={style.pendingNumber}>
                  {pending.length}
                </div>
              </div>
            }
          </div>
          <div className={style.mainChat}>
            {(showPending ? pending : users).map((user) => (
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
      </div>
      <div className={style.messages}>
        {/* {console.log(chat, "Hey")} */}
        
          {chat ? ( 
              <>
                <div className={style.messageUser}>
                  <div className={style.profile}>
                    <div className={style.userImage}>
                    </div>
                    <div className={style.userContent}>
                      <h3>{chat.name}</h3>
                      <p>{chat.isOnline ? 'Online' : ''}</p>
                    </div>
                  </div>
                  <div className={style.icons}>
                    <BsSearch />
                    <MoreVertIcon />
                  </div>
                </div>
                <div className={style.messageContainer}>

                  <div className={style.message}>
                    {msgs.length
                      ? msgs.map((msg, i) => (
                          <Message key={i} msg={msg} user1={user1} />
                        ))
                      : null}
                  </div>
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
              <h3 className={style.emptyConvo}>Start a Conversation with people around you</h3>            
            </div>
          )}
      </div>  
    </div>
  );
};

export default Messages;
