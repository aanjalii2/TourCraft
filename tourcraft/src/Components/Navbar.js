import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated, logout } from "../app/slices/authSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  
  
    
  };
  
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
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/help">Help</NavLink>
          </li>
          <li>
            {isAuthenticated && (
              <NavLink to="/destinationselect">
                <button>Book Now</button>
              </NavLink>
            )}
          </li>
          <li>
            {!isAuthenticated ? (
              <>
             
                  <button onClick={() => navigate("/login")} className="" variant={"outline"}>
                  Log In
                </button>
                
                <button onClick={() => navigate("/signup")} className="" variant={"outline"}>
                  Signup
                </button>
              </>
            ) : (
              <button onClick={handleClick} className="custom-button">
                <AccountCircleIcon className="t" style={{ fontSize: "1.25rem", marginTop: "2px" }} />
              </button>


            )}
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
          <List></List>
          <Divider />
        </Box>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate("/profile")}>My Profile</MenuItem>
        <MenuItem onClick={() => navigate("/my-bookings")}>My Bookings</MenuItem>
        <MenuItem onClick={() => navigate("/feedback")}>Feedback</MenuItem>
        {/* <MenuItem onClick={() => { handleClose(); navigate("/logout"); }}>Volunteering</MenuItem> */}
        <MenuItem onClick={() => { handleClose(); dispatch(logout()); navigate("/login"); toast.success("Logged out Successfully!"); }}>Logout</MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
