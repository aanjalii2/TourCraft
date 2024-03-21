import React from "react";
import { NavLink } from 'react-router-dom';
 import BannerImage from "../Assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
     <div className="home-container">
     
      <div className="home-banner-container">
        
        <div className="home-text-section">
          <h1 className="primary-heading">
            Tour Craft
          </h1>
          <p className="primary-textt">
          Embark on a journey of discovery with our comprehensive platform designed to elevate your travel experiences throughout the breathtaking landscapes of Nepal.
          
          </p>
          <p className="secondary-textt">
           
            Explore Nepal's rich cultural heritage, majestic mountains, and vibrant cities with ease through our intuitive interface. Whether you're seeking adrenaline-pumping adventures, serene retreats, or immersive cultural experiences, we've got you covered.
          </p>
          

          
          <NavLink to="/destinationselect">
          <button className="secondary-button">
            Book Now <FiArrowRight />{" "}
          </button>
        </NavLink>
        

        </div>
        <div className="home-imagee">
          <img src={BannerImage} alt="" />
        </div>
      
    </div>
    </div>
    
    
    
  );
};

export default Home;