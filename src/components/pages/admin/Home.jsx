import React, { useState } from 'react';
import { adminSidebarData } from '../../general/data/adminSidebarData';
import { NavLink, Outlet} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';


export const Home = () => {

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   adminSidebarData.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" >
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <Outlet/>
        </div>
    );
};


    
