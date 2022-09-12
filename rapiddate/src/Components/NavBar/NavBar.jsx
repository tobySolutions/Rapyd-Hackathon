import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { BsSearch } from "react-icons/bs";
import style from './Navbar.module.css'
import {motion} from 'framer-motion'
import { useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../database/firebase";
import { useDispatch } from "react-redux";
import { setUsers } from "../../redux/Users/UsersSlice";


const Navbar = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const handleSearch = () => {
    const userRef = collection(db, 'Users')
    const q = query(userRef, where("name", "==", searchValue.toLocaleLowerCase()));
    const unsub =  onSnapshot(q, (querySnapshot) => {
      let users = []
      querySnapshot.forEach((doc) => {
          users.push(doc.data())
      });
      dispatch(setUsers(users))
    })
    setSearchValue('')
    return () => unsub();
  }
  return (
    <div className={style.navbar}>
      <div className={style.wrapper}>          
          <div className={style.nav_search}>
            <input 
              className={style.nav_input} 
              value={searchValue} 
              onChange={e => setSearchValue(e.target.value)} 
              type="text" 
              placeholder="Search Here" 
            />
            <BsSearch onClick={handleSearch} className={style.nav_icon2} />
          </div>
        <div className={style.items}>
          <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.7}} className={style.item}>
            <LanguageOutlinedIcon className={style.icon} />
            English
          </motion.div>
          <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.7}} className={style.item}>
            <DarkModeOutlinedIcon
              className={style.icon}
            />
          </motion.div>
          <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.7}} className={style.item}>
            <NotificationsNoneOutlinedIcon className={style.icon} />
            <div className={style.counter}>1</div>
          </motion.div>
          <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.7}} className={style.item}>
            <ChatBubbleOutlineOutlinedIcon className={style.icon} />
            <div className={style.counter}>2</div>
          </motion.div>
          <motion.div  className={style.item}>
            <p style={{marginRight: "20px"}}>Hi Grace</p>
            <motion.img
              whileHover={{scale:1.1}}
              whileTap={{scale:0.7}}
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className={style.avatar}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
