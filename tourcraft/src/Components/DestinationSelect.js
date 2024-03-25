import React from 'react';
import './DestinationSelect.css';
import image1 from "../Assets/image1.png";
import image2 from "../Assets/image2.png";
import image3 from "../Assets/image3.png";
import { NavLink } from 'react-router-dom';


const DestinationSelect = () => {
  return (
    <div className="destination-select-container">
      <div className="search-bar">
        <input type="text" placeholder="Search Destination" />
        <button type="button">Search</button>
      </div>
      <div className="destinations">
        <h2>Popular Destinations</h2>
        <div className="destination-card">
          <img src={image1} alt="Pokhara" />
          <div className="destination-info">
            <h3>Phokhara</h3>
            <p>Pokhara, n the Himalayas of Nepal, captivates visitors with its stunning lakes, majestic mountain views, and vibrant culture.</p>
            
    
             <NavLink to="/pokhara">
              <button type="button">View Details</button>
              </NavLink>
          
            
          </div>
        </div>
        <div className="destination-card">
          <img src={image2} alt="Destination 2" />
          <div className="destination-info">
            <h3>Lumbini</h3>
            <p>Lumbini, located in Nepal's Rupandehi District, is renowned as the birthplace of Siddhartha Gautama, who later became known as Lord Buddha.</p>
            
             <NavLink to="/lumbini">
              <button type="button">View Details</button>
              </NavLink>
          
          </div>
        </div>
        <div className="destination-card">
          <img src={image3} alt="Destination 3" />
          <div className="destination-info">
            <h3>Bandipur</h3>
            <p>Bandipur, a quaint hilltop town in Nepal, boasts beautifully preserved Newari architecture and offers panoramic views of the Himalayas.</p>
            
             <NavLink to="/bandipur">
              <button type="button">View Details</button>
              </NavLink>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationSelect;
