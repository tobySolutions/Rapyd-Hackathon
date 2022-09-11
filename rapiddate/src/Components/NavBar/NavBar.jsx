import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { BsSearch } from "react-icons/bs";
import style from './Navbar.module.css'
import {motion} from 'framer-motion'


const Navbar = () => {

  return (
    <div className={style.navbar}>
      <div className={style.wrapper}>          
          <div className={style.nav_search}>
            <input className={style.nav_input} type="text" placeholder="Search Products, categories ..." />
            <BsSearch className={style.nav_icon2} />
          </div>
        <div className={style.items}>
          <motion.div  className={style.item}>
            <LanguageOutlinedIcon className={style.icon} />
            English
          </motion.div>
          <motion.div  className={style.item}>
            <DarkModeOutlinedIcon
              className={style.icon}
            />
          </motion.div>
          <motion.div  className={style.item}>
            <NotificationsNoneOutlinedIcon className={style.icon} />
            <div className={style.counter}>1</div>
          </motion.div>
          <motion.div  className={style.item}>
            <ChatBubbleOutlineOutlinedIcon className={style.icon} />
            <div className={style.counter}>2</div>
          </motion.div>
          <motion.div className={style.item}>
            <img
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
