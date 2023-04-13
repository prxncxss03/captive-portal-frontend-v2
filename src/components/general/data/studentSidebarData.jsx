import {
    FaUserAlt,
    FaChalkboardTeacher,
    FaBookReader
}from "react-icons/fa";
import {RiDashboardFill,RiSettings4Fill} from "react-icons/ri";
import {MdPendingActions,MdFilterAlt} from "react-icons/md"
import { BsChatDots } from "react-icons/bs";

export const studentSidebarData = [
    {
        path:"/student/dashboard",
        name:"Dashboard",
        icon: <RiDashboardFill size={21}/>
    },
    {
        path:"/student/settings",
        name:"Settings",
        icon: <RiSettings4Fill size={22}/>
    },
]