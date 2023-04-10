import {
    FaTh,
    FaUserAlt,
    FaRegChartBar,
}from "react-icons/fa";

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
        path:"/analytics",
        name:"Analytics",
        icon:<FaRegChartBar/>
    }
]