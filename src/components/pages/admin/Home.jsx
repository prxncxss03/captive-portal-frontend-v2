import React, { useState } from 'react';
import { adminSidebarData } from '../../general/data/adminSidebarData';
import { NavLink, Outlet} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { Box, Divider, IconButton, Stack, SvgIcon, Typography,Button } from '@mui/material';
import { Logo } from '../../general/Logo';
import {HiChevronUpDown} from "react-icons/hi2";

export const Home = () => {

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '100%'
        }}>
         
            <Box sx={{
                backgroundColor: 'primary.dark',
                color: 'primary.contrastText',
                width: isOpen ? "200px" : "50px",
                height: "100vh",

            }}>

                    <div className="top_section">
    
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}/>
                        </div>
                    </div>
            
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                    }}
                    >
                    <Box sx={{ p: 3 }}>
                    <Box
                        href="/"
                        sx={{
                        display: 'inline-flex',
                        height: 32,
                        width: 32
                        }}
                    >
                        <Logo />
                    </Box>
                    <Box
                        sx={{
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        p: '12px'
                        }}
                    >
                        <div>
                        <Typography
                            color="inherit"
                            variant="subtitle1"
                        >
                            La Verdad
                        </Typography>
                        <Typography
                            color="neutral.400"
                            variant="body2"
                        >
                            Captive Portal
                        </Typography>
                        </div>
                        <SvgIcon
                        fontSize="small"
                        sx={{ color: 'neutral.500' }}
                        >
                        <HiChevronUpDown/>
                        </SvgIcon>
                    </Box>
                    </Box>
                    <Divider sx={{ borderColor: 'neutral.700' }} />
                    <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 3
                    }}
                    >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0
                        }}
                    >
                            {
                    adminSidebarData.map((item, index)=>(
                        <NavLink to={item.path}  key={index}   className="link" >
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2 }}>
                                    {item.icon}

                                    <Box sx={{
                                        display: isOpen ? "block" : "none" 
                                    }}>
                                        <Typography
                                            color="primary.contrastText"
                                            variant="subtitle2"
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>
                            </Stack>
                       
                    </NavLink>
                    ))
                }
                    </Stack>
                    </Box>
                    <Divider sx={{ borderColor: 'neutral.700' }} />

                    </Box>
    
               
            </Box>
           <Outlet/>
        </Box>
    );
};


