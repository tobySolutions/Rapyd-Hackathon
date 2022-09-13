import style from "./Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { sideBarData } from "./SideBarData";
import LogoutIcon from '@mui/icons-material/Logout';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../database/firebase";
import { useSelector } from "react-redux";
import { showUser } from "../../redux/User/UserSlice";


const Sidebar = () => {
    const navigate = useNavigate()
    const user = useSelector(showUser)
    const handleLogout = async () => {
        localStorage.setItem('user', '')
        await updateDoc(doc(db, 'Users', user.uid), {
            isOnline:false
        })
        navigate("/login")
    }
    
    return (
        <div className={style.sidebar}>
            <div className={style.sidebarContainer }>
                {/* LOGO */}
                <div className={style.top}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className={style.logo}>Rapyd Dating</span>
                    </Link>
                </div>

                {/* CONTENT */}
                <div className={style.center}>
                    <ul>
                        <p className={style.title}>MENU</p>
                        {sideBarData?.map((data) => {
                            const {id, name, route, icon, selected} = data
                            return (
                                <Link 
                                    key={id} 
                                    to={route} 
                                    style={{ textDecoration: "none",color: '#888' }}
                                >
                                    <li className={`${style.listItem} ${selected ? style.selected : ''}`}>
                                        {icon}
                                        <span>{name}</span>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
                <div className={style.center}>
                    <ul>
                        <Link 
                            to="/login" 
                            style={{ textDecoration: "none",color: '#888' }}
                            onClick={handleLogout}
                        >
                            <li className={`${style.listItem}`}>
                                <LogoutIcon className={style.icon} />
                                <span>Logout</span>
                            </li>
                        </Link>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
