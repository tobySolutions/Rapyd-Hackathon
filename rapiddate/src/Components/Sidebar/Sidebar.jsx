import style from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { sideBarData } from "./SideBarData";


const Sidebar = () => {
    
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

                {/* THEME CHANGER */}
                <div className={style.bottom}>
                    <div className={style.colorOption}
                        // onClick={() => {
                        //     dispatch(darkMode(false))
                        //     console.log(theme)
                        // }}
                    ></div>
                    <div
                    className={style.colorOption}
                    // onClick={() => {
                        
                    //     dispatch(darkMode)
                    //     console.log(theme)
                    //     }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
