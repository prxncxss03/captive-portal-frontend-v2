import React, { useState } from 'react';
import { adminSidebarData } from './../../general/data/adminSidebarData';
import { NavLink, Navigate, Outlet,useNavigate} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { Box, Divider, IconButton, Stack, SvgIcon, Typography,Button } from '@mui/material';
import { Logo } from './../../general/Logo';
import {HiChevronUpDown} from "react-icons/hi2";
import Tooltip from '@mui/material/Tooltip';
import { BROWN } from './../../general/config';
import { instance } from './../../../helper/http';
import { LetterAvatar } from './../../general/LetterAvatar';


export const Home = () => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLogout, setIsLogout] = useState(false);

   const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
        
    }
    const[isOpenMenu ,setIsOpenMenu] = useState(false);

     
      const [isShowLogout ,setIsShowLogout] = useState(false);

      const handleShowLogout = () => {
          setIsShowLogout(!isShowLogout);
  
      }
  
      const handleLogout = () => {
          instance.post('/api/auth/logout').then((response) => {
              console.log(response.data.message);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/auth/login')
          }).catch((error) => {
              console.log(error);
          });
          
      
        
    }
    

    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            
            
        }}>
        <Box sx={{
            backdropFilter: "blur(3px)",
            backgroundColor:'#fff',
            position: 'absolute',
            top: '0px' ,
            right: 0,
            zIndex: 49,
            width: '100%',
            height: '60px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>

        <Box 

        onClick={toggleMenu}
        sx={{
            position: 'absolute',
            top: '0px' ,
            left: 0,
            zIndex: 49,
            width: '100%',
            height: '100vh',
            backdropFilter: "blur(3px)",
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            display: 'none',
            transition: 'all 0.5s ease',
            userSelect: 'none',
            
            //show on mobile size
            '@media (max-width: 600px)': {
                display: isOpenMenu ? 'block' : 'none',
            },
        }}>

        </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '20px',
                marginTop: '10px',
                
            }}>
                <Logo />
               
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: '20px',
            }}>
                <Box onClick={handleShowLogout}>
                    <LetterAvatar name={user.first_name + " " + user.last_name} />
                </Box>
                <Button 
                
                variant='contained' 
                onClick={handleLogout}
                sx={{
                    backgroundColor: '#FFF',
                    color: 'primary.main',
                    position: 'absolute',
                    top: '50px',
                    right: '5px',
                    zIndex: 49,
                    display: isShowLogout ? 'block' : 'none',

                    ':hover': {
                        backgroundColor: BROWN,
                        color: '#FFF',
                    }
                    

                }}>
                    Logout
                </Button>
            </Box>
            
        </Box>
            

         
            <Box sx={{
                backgroundColor: 'primary.dark',
                color: 'primary.contrastText',
                width: isOpenMenu ? "330px" : "60px",
                height: "100vh",
                position: 'fixed',
                zIndex: 50,
                padding: isOpenMenu ? '0 0 0 4px' : '0 0 0 0',
                marginRight: isOpenMenu ? '330px' : '60px',
                //add hover effect
            
                '@media screen and (max-width: 653px)': {
                    width: isOpenMenu ? "250px" : "50px",
                    padding: '0',
                }

            }}>

                    
    
                <Box sx={{marginLeft: isOpenMenu ? "20px" : "20px", marginTop: '25px', 
                ":hover":{
                    cursor: 'pointer',
                    color: BROWN,
                }
                }} className="bars">
                    <FaBars onClick={toggleMenu} />
                </Box>
            
            
                <Box
                   
                    sx={{
                    
                    flexDirection: 'column',
                    height: '100%',
                    
                        
                    '@media screen and (max-width: 768px)': {
                 
                }
                    }}
                    >
                    <Box sx={{ p: 3 ,
                    display: isOpenMenu ? "block" : "none",
                     
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
                    <Divider sx={{ borderColor: 'neutral.700', display: isOpenMenu ? 'block' : 'none' }} />
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
                        
                        <NavLink to={item.path}  key={index} className="link" style={{
                            textDecoration: "none",
                            //add hover effect

                        }}>
                        <Tooltip title={item.name} placement="right" arrow>
                            <Stack direction="row" alignItems='center' spacing={2} sx={{ p: isOpenMenu ? 2 : 0,
                            ":hover": {
                                backgroundColor: isOpenMenu ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                borderRadius: 1,
                                
                                
                            },                       
                            marginBottom: isOpenMenu ? 0 : 4  }}>
                                <SvgIcon fontSize="small" sx={{ color: 'primary.lightest', mt: 0.5,
                                fontSize: isOpenMenu ? "20px" : "25px",
                                transition: "all 0.34s ease",
                                ":hover": {

                                    color: BROWN,

                                }
                                }}>
                                    {item.icon}
                                </SvgIcon>

                                    <Box sx={{
                                        display: isOpenMenu ? "block" : "none" 
                                    }}>
                                        <Typography
                                        sx={{
                                            display: isOpenMenu ? "block" : "none"
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



            <Box 
              
            sx={{
                width: '100%',
                height: '100%',
                p: 3,
                margin: isOpenMenu ? '0 0 0 330px' : '0 0 0 60px',

                '@media screen and (max-width: 500px)': {
                    display: isOpenMenu ? 'none' : 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },    
                '@media screen and (max-width: 453px)': {
                    margin: isOpenMenu ? '0 0 0 330px' : '0 0 0 50px',
                    padding: '40px 0 0 0',
                    width: '400px',
                }

                
            }}>
      
                <Outlet context={isOpenMenu}/>
            </Box>
          
        </Box>
    );
};


