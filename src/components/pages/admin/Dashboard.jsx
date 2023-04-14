import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material";
import {
    FaUserAlt,
    FaChalkboardTeacher,
    FaBookReader
}from "react-icons/fa";
import {MdPendingActions,MdFilterAlt} from "react-icons/md";
import { OverviewUser } from "../../sections/overview/OverviewUser"
import { instance } from "../../../helper/http"
import { Ostable } from "../../sections/overview/Ostable";



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
        <Box style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            height: "100%",
            flexWrap: "wrap",
        }}>
            <Typography variant="h4" style={{
            marginTop: 60,
            marginBottom: '20px',
            marginLeft: '20px',

            }}>
                Overview
            </Typography>
       
        <Box style={{
            display: "flex",
            maxWidth: "100%",
            height: "100%",
            alignItems: "center",
            margin: 0,
            flexWrap: "wrap",

            //media query
            "@media (max-width: 600px)": {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                padding: 0,
            },
            "@media (max-width: 400px)": {
                margin: '60px',
                padding: 0,

                
            }
         
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
                value={data.totalBlockedWebsite}
                icon={<MdFilterAlt />}
            />
            <Ostable>

            </Ostable>
        </Box>
    </Box>
    )
}