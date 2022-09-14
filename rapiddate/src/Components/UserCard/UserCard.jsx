import React, { useEffect, useState } from "react"
import profile from './tolu.png'
import style from './UserCard.module.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "../../database/firebase";
import { useSelector } from "react-redux";
import { showUser } from "../../redux/User/UserSlice";

const UserCard = ({user}) => {
  const mainUser = useSelector(showUser)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [requests, setRequests] = useState([])
  const [change, setChange] = useState(false)
  const sendRequest = async () => {
    setLoading(true)
    await setDoc(doc(db, "Friends", user.uid, "Friends", mainUser.uid), {...mainUser, friendStatus: "pending"});
    setLoading(false)
    setDisabled(true)
  }
  useEffect(() => {
    const test = async() => {
      const requestRef = collection(db, "Friends", user.uid, "Friends" );
      const docRef = query(requestRef);
      const querySnapshot = await getDocs(docRef);
      let arr = []
      querySnapshot.forEach((doc) => {
        arr.push(doc.data())
      });
      setRequests(arr)
      requests?.map((request) => {
        if(request.uid === mainUser.uid){
          console.log(request.uid, mainUser.uid)
          setDisabled(true)
          return true
        }else{
          setDisabled(false)
          return false
        }
      })
    }
    test()
  }, [])

    return (
      <div className={style.card__new}>
        
        <div className={`${style.onlineStatus} ${user.isOnline ? style.online : style.notOnline}`}></div>
        <RemoveRedEyeIcon className={style.icon} />
        <div className={style.imgBx}>
          <img src={profile} alt="" />
        </div>
        <div className={style.content}>
          <div className={style.details}>
            <h2>
              Alina Smith <br />
              <span> Senior UI/UX Designer</span>
            </h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam molestias fugiat earum!</p>
            <div className={`${disabled ? '' : style.actionBtn}`}>
              <button onClick={sendRequest} disabled={disabled}>
                {disabled ? 'Request Sent' : 'Send Request'}
                </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UserCard