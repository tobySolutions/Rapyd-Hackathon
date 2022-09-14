import { MoreVert } from '@material-ui/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoodIcon from '@mui/icons-material/Mood';
import SendIcon from '@mui/icons-material/Send';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {BsSearch} from 'react-icons/bs'
import React from 'react'
import style from './whatsapp.module.css'
const Whatsapp = () => {
  return (
    <div className={style.whatsapp}>
        <div className={style.sidebar}>
            {/* Header */}
            <div className={style.header}>
                <div className={style.chatheaderLeft}>
                    <KeyboardBackspaceIcon style={{width: "20px"}} className={style.icon} />
                    <div className={style.avatar}></div>
                </div>
                <div className={style.chatheaderRight}>
                    <MoreVert className={style.icon}  />
                </div>
            </div>
            {/* Search */}
            <div className={style.sidebarSearch}>
                <div className={style.sidebarSearchContainer}>
                    <BsSearch className={style.sidebarIcon} />
                    <input type="text" placeholder='Search for a Chat' />
                </div>
            </div>
            {/* ChatList */}
            <div className={style.sidebarChats}>
                <div className={style.sidebarChat}>
                    <div className={style.chatAvatar}></div>
                    <div className={style.chatInfo}>
                        <h4>Mike Daisan</h4>
                        <p>Last Message</p>
                    </div>
                    <div className={style.time}>
                        <p>2.44</p>
                        <p>1</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Message Container */}
        <div className={style.messageContainer}>
            {/* Message Header */}
            <div className={style.header}>
                <div className={style.chatTitle}>
                    <div className={style.avatar}></div>
                    <div className={style.messageHeaderContent}>
                        <h4>Amelia Cuiree</h4>
                        <p>Online</p>
                    </div>
                </div>
                <div className={style.chatHeaderRight}>
                    <BsSearch className={style.icon} />
                    <MoreVertIcon className={style.icon} />
                </div>
            </div>

            {/* Message Content */}
            <div className={style.messageContent}>
                <p className={style.chatMessage}>This is a message <span className={style.chatTimeStamp}>11.33pm</span></p>
                <p className={`${style.chatMessage} ${style.chatSent}`}>This is a message <span className={style.chatTimeStamp}>11.33pm</span></p>
            </div>
            
            {/* Message Footer */}
            <div className={style.messageFooter}>
                <div className={style.footerInput}>
                    <div className={style.footerInputContainer}>
                        <MoodIcon className={style.footerIcon} />
                        <input type="text" placeholder='Type a Message' name="" id="" />
                    </div>
                </div>
                <SendIcon className={style.messageFooterIcon} />
            </div>
        </div>
    </div>
  )
}

export default Whatsapp