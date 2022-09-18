import React, { useEffect, useState } from "react"
import profile from './tolu.png'
import style from './UserCard.module.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "../../database/firebase";
import { useSelector } from "react-redux";
import { showUser } from "../../redux/User/UserSlice";
import UserModal from "../UserModal/UserModal";


const  UserCard = ({user}) => {
  const mainUser = useSelector(showUser)
  const [showModal, setShowModal] = useState()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [requests, setRequests] = useState([])
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
  const styles = {
    backgroundImage: user?.photo,
    backgroundSize: 'cover',
    backgroundPostion:'center',
    position:'relative'
  }
  const handleShowMessage=() => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className={style.card_new} style={styles} >
      <div className={`${style.onlineStatus} ${user.isOnline ? style.online : style.notOnline}`}></div>
      <RemoveRedEyeIcon onClick={handleShowMessage} className={style.icon} />
      <img src={user?.photo} className={style.profileImage} alt='profile' />
      <div className={style.userInfo}>
        <p>{user?.name}</p>
        <p>18</p>
      </div>
      {showModal ? (
        <UserModal onClose={handleCloseModal}>
          This is the modal message
          <button onClick={sendRequest} disabled={disabled}>{loading ? 'Connecting.....' : 'Send Request'}</button>
        </UserModal>
      ): ''}
    </div>

  )
}

export default UserCard