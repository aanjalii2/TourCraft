

/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom';
import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";



import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav>
       
      
 
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
      <ul>
          <li>
             <NavLink to="/">Home</NavLink>
          </li>
          <li>
             <NavLink to="/about" onclick={() => navigate('About')}>About</NavLink>
          </li>
          <li>
             <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
             <NavLink to="/help">Help</NavLink>
          </li>
          <li>
             <NavLink to="/login">Signup/Login</NavLink>
          </li>
          {/* <a href="">Help</a>
        <a href="">Signup/Login</a> */}
        <li>
          <NavLink to="/destinationselect">
        <button className="primary-button">Book Now</button>
        </NavLink>
        </li>
         
       </ul>
       
       

        
       
      </div>
      <div className="straight-line"></div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;