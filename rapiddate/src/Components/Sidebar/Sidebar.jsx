import style from './Sidebar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { sideBarData } from './SideBarData'
import LogoutIcon from '@mui/icons-material/Logout'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../database/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { showUser } from '../../redux/User/UserSlice'
import { BsArrowLeft } from 'react-icons/bs'
import { toggleMenu } from '../../redux/Menu/MenuSlice'
import { useState } from 'react'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(showUser)
  const handleLogout = async () => {
    updateDoc(doc(db, 'Users', user.uid), {
      ...user,
      isOnline: false
    })
      .then(() => {
        localStorage.setItem('user', '')
        navigate('/')
        window.location.reload()
      })
      .catch(error => console.log(error))
  }
  const [selected, setSelected] = useState(null)
  const handleClassChange = (name) => {
    if(name.toLowerCase() === selected){
      console.log(selected, name)
      return style.selected
    }
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarContainer}>
        {/* LOGO */}
        <div className={style.top}>
          <div
            style={{flex:1}}
            className={style.backArrow}
            onClick={() => {
              dispatch(toggleMenu(false))
            }}
          >
            <BsArrowLeft />
          </div>
          <Link to='/' style={{ textDecoration: 'none', flex:'10' }}>
            <span className={style.logo}>Rapyd Dating</span>
          </Link>
        </div>

        {/* CONTENT */}
        <div className={style.center}>
          <ul>
            <p className={style.title}>MENU</p>
            {sideBarData?.map(data => {
              const { id, name, route, icon, fullClass } = data
              return (
                <Link
                  key={id}
                  to={route}
                  style={{ textDecoration: 'none', color: '#888' }}
                >
                  <li
                    onClick={() => setSelected(name.toLowerCase())}
                    className={`${style.listItem} ${handleClassChange(name)}`}
                  >
                    {icon}
                    <span className={fullClass}>{name}</span>
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
        <div className={style.center}>
          <ul>
            <p
              style={{ textDecoration: 'none', color: '#888', cursor:'pointer' }}
              onClick={handleLogout}
            >
              <li className={`${style.listItem}`}>
                <LogoutIcon className={style.icon} />
                <span>Logout</span>
              </li>
            </p>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
