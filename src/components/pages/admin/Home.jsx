import React, { useState } from 'react';
import { adminSidebarData } from '../../general/data/adminSidebarData';
import { NavLink, Outlet} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { Box, Divider, IconButton, Stack, SvgIcon, Typography,Button } from '@mui/material';
import { Logo } from '../../general/Logo';
import {HiChevronUpDown} from "react-icons/hi2";
import Tooltip from '@mui/material/Tooltip';
//import { Header } from '../../sections/header/Header';

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
                width: isOpen ? "330px" : "60px",
                height: "100vh",
                position: 'fixed',
                zIndex: 50,
                padding: isOpen ? '0 0 0 4px' : '0 0 0 0',
                //add hover effect
            
                '@media screen and (max-width: 653px)': {
                    width: isOpen ? "250px" : "50px",
                    padding: '0',
                }

            }}>

                    <div className="top_section">
    
                        <div style={{marginLeft: isOpen ? "20px" : "20px", marginTop: '25px'}} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
            
                <Box
                    sx={{
                    
                    flexDirection: 'column',
                    height: '100%',
                        
                    '@media screen and (max-width: 768px)': {
                 
                }
                    }}
                    >
                    <Box sx={{ p: 3 ,
                    display: isOpen ? "block" : "none",
                     
                     }}>
                  
                    <Box
                        sx={{
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        p: '15px'
                        }}

                        
                    >
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
                    <Divider sx={{ borderColor: 'neutral.700', display: isOpen ? 'block' : 'none' }} />
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
                        
                        <NavLink to={item.path}  key={index} onClick={toggle}   className="link" style={{
                            textDecoration: "none",
                            //add hover effect

                        }}>
                        <Tooltip title={item.name} placement="right" arrow>
                            <Stack direction="row" alignItems='center' spacing={2} sx={{ p: isOpen ? 2 : 0,
                            ":hover": {
                                backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                borderRadius: 1,
                                
                                
                            },                       
                            marginBottom: isOpen ? 0 : 4  }}>
                                <SvgIcon fontSize="small" sx={{ color: 'primary.lightest', mt: 0.5,
                                fontSize: isOpen ? "20px" : "25px",
                                transition: "all 0.34s ease",
                                ":hover": {

                                    color: '#dcab5e',

                                }
                                }}>
                                    {item.icon}
                                </SvgIcon>

                                    <Box sx={{
                                        display: isOpen ? "block" : "none" 
                                    }}>
                                        <Typography
                                        sx={{
                                            display: isOpen ? "block" : "none"
                                        }}
                                            color="primary.contrastText"

                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>
                            </Stack>
                        </Tooltip>
                       
                    </NavLink>
                    ))
                }
                    </Stack>
                    </Box>
                   

                    </Box>
    
               
            </Box>



            <Box sx={{
                width: '100%',
                height: '100%',
                p: 3
            }}>
      
                <Outlet/>
            </Box>
          
        </Box>
    );
};


