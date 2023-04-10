import {
    FaUserAlt,
    FaChalkboardTeacher,
    FaBookReader
}from "react-icons/fa";

import {RiDashboardFill,RiSettings4Fill} from "react-icons/ri";
import {MdPendingActions} from "react-icons/md";

export const adminSidebarData = [
    {
        path:"/admin/dashboard",
        name:"Dashboard",
        icon: <RiDashboardFill size={18}/>
    },
    {
        path:"/admin/students",
        name:"Students",
        icon: <FaBookReader size={18}/>
    },
    {
        path:"/admin/faculty",
        name:"Faculty",
        icon:<FaChalkboardTeacher size={18}/>

    },
    {
        path:"/admin/pending-accounts",
        name:"Pending Accounts",
        icon: <MdPendingActions size={19}/>
    },
    {
        path:"/admin/settings",
        name:"Settings",
        icon: <RiSettings4Fill size={18}/>
    }
]