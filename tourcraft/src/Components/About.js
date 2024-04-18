import React from "react";
import AboutBackgroundImage from "../Assets/about-background-image.png";

//import { useNavigate } from 'react-router-dom';



const About = () => {
 // const navigate = useNavigate();
  return (
     
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
    
  );
};

export default About;


