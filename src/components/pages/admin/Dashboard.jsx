import React, { useEffect, useState } from "react"
import { MdOutlineSchool } from "react-icons/md"
import {
    FaUserAlt,
    FaChalkboardTeacher,
    FaBookReader
}from "react-icons/fa";
import {MdPendingActions,MdFilterAlt} from "react-icons/md";
import { OverviewUser } from "../../sections/overview/OverviewUser"
import { instance } from "../../../helper/http"

export const Dashboard = () => {  
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;  
    const [data, setData] = useState({
        totalStudents: 0,
        totalFaculty: 0,
        totalBlockedWebsite: 0,
        totalPendingAccounts: 0,
    })

    useEffect(()=>{
        getData()
    },[])

    const getData = () => {
        instance.get('/api/admin/dashboard').then((response)=>{
            console.log(response.data)
            setData({
                totalStudents: response.data.students.length,
                totalFaculty: response.data.faculty.length,
                totalBlockedWebsite: response.data.blocked_websites.length,
                totalPendingAccounts: response.data.pending_accounts.length,
            })
        }).catch((error)=>{
            console.log(error)
        })}

    
    return(
        <div style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "yellow"
        }}>
            <OverviewUser 
                title="Total Students"
                value={data.totalStudents}
                icon={<FaBookReader/>}
            />

            <OverviewUser 
                title="Total Faculty"
                value={data.totalFaculty}
                icon={<FaChalkboardTeacher />}
            />

            <OverviewUser 
                title="Total Pending Accounts"
                value={data.totalPendingAccounts}
                icon={<MdPendingActions />}
            />

            <OverviewUser 
                title="Total Blocked Website"
                value={data.totalStudents}
                icon={<MdFilterAlt />}
            />
        </div>
    )
}