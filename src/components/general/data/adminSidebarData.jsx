import {
    FaTh,
    FaUserAlt,
    FaRegChartBar,
}from "react-icons/fa";

import {MdPendingActions} from "react-icons/md";

export const adminSidebarData = [
    {
        path:"/admin/dashboard",
        name:"Dashboard",
        icon:<FaTh/>
    },
    {
        path:"/admin/students",
        name:"Students",
        icon:<FaUserAlt/>
    },
    {
        path:"/admin/pending-accounts",
        name:"Pending Accounts",
        icon: <MdPendingActions/>
    }
]