import React from "react";
import { NavLink } from 'react-router-dom';
 import BannerImage from "../Assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import AboutBackgroundImage from "../Assets/about-background-image.png";

const Home = () => {
  return (
     <div className="home-container">
     
      <div className="home-banner-container">
        
        <div className="home-text-section">
          <h1 className="primary-subheading">
            Tour Craft
          </h1>
          <p className="primary-text">
          Embark on a journey of discovery with our comprehensive platform designed to elevate your travel experiences throughout the breathtaking landscapes of Nepal.
          Embark on a journey of discovery with our comprehensive platform designed to elevate your travel experiences throughout the breathtaking landscapes of Nepal.
          </p>
          <p className="secondary-text">
           
            Explore Nepal's rich cultural heritage, majestic mountains, and vibrant cities with ease through our intuitive interface. Whether you're seeking adrenaline-pumping adventures, serene retreats, or immersive cultural experiences, we've got you covered.
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
    <div className="about-section-container">
       <div className="about-background-image-container">
         {/* <img src={AboutBackground} alt="" /> */}
       </div>
       <div className="about-section-image-container">
         <img src={AboutBackgroundImage} alt="" />
       </div>
       <div className="about-section-text-container">
         <p className="primary-subheading">About Us</p>
         <h1 className="primary-heading">
         Welcome to TourCraft..
         </h1>
         <p className="primary-text">
         At TourCraft, we're passionate about unlocking the wonders of Nepal for travelers worldwide. Nestled in the heart of the Himalayas, Nepal is a land of breathtaking landscapes, rich culture, and warm hospitality. Our platform is designed to enhance your travel experience and make exploring Nepal an unforgettable journey.
         </p>
         <p className="primary-text">
         Join us on a transformative journey through the enchanting landscapes and vibrant culture of Nepal. Let us be your trusted companion as you embark on an exploration of a lifetime.
 
 Discover Nepal with TourCraft – Where Every Journey Begins!
         </p>
         <div className="about-buttons-container">
           <button className="secondary-button">Learn More</button>
           
         </div>
       </div>
     </div>
     <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </div>
    </div>
    </div>
    
    
 
 
 
  );
};

export default Home;

     