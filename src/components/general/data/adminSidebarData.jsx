import {
    FaUserAlt,
    FaChalkboardTeacher,
    FaBookReader
}from "react-icons/fa";
import {RiDashboardFill,RiSettings4Fill} from "react-icons/ri";
import {MdPendingActions,MdFilterAlt} from "react-icons/md"
import { BsChatDots } from "react-icons/bs";

export const adminSidebarData = [
    {
        path:"/admin/dashboard",
        name:"Dashboard",
        icon: <RiDashboardFill size={21}/>
    },
    {
        path:"/admin/students",
        name:"Students",
        icon: <FaBookReader size={18}/>
    },
    {
        path:"/admin/faculty",
        name:"Faculty",
        icon:<FaChalkboardTeacher size={22}/>

    },
    {
        path:"/admin/pending-accounts",
        name:"Pending Accounts",
        icon: <MdPendingActions size={22}/>
    },
    {
        path: "/admin/web-content-filter",
        name: "Web Content Filter",
        icon: <MdFilterAlt size={22}/>

    },
    {
        path:"/admin/settings",
        name:"Settings",
        icon: <RiSettings4Fill size={22}/>
    },
    {
        path:"/admin/chat",
        name:"Chat",
        icon: <BsChatDots size={22}/>
    }
]