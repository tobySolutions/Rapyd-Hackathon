import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import {BsChat, BsEnvelope} from "react-icons/bs"
import style from './Sidebar.module.css'

export const sideBarData = [
    {
        id:1,
        name:"Dashboard",
        icon: <DashboardIcon className={style.icon} />,
        route: '/dashboard',
        selected: true,
        classNames:style.selected
    },
    {
        id:2,
        name:"Explore",
        icon: <BsEnvelope className={style.icon} />,
        route: '/explore',
        classNames:style.selected
    },
    {
        id:3,
        name:"Messages",
        icon: <BsEnvelope className={style.icon} />,
        route: '/messages',
    },
    {
        id:4,
        name:"Schedule",
        icon: <StoreIcon className={style.icon} />,
        route: '/schedule',
    },
    {
        id:5,
        name:"Wallet",
        icon: <CreditCardIcon className={style.icon} />,
        route: '/wallet',
    },
    {
        id:6,
        name:"Chat Requests",
        icon: <BsChat className={`${style.icon} ${style.chatRequest}`} />,
        route: '/requests',
        fullClass: style.chatRequest
    },
    
]