import React from "react"
import profile from './tolu.png'
import style from './UserCard.module.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const UserCard = ({user}) => {
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
            <div className={style.actionBtn}>
              <button>Message</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UserCard