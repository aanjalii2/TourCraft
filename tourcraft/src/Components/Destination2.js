import React from 'react';
import './Destination.css';
import { NavLink } from 'react-router-dom';
import image2 from "../Assets/image2.png";
import image22 from "../Assets/image22.png";


const tripData = {
  destination: 'Lumbini',
  duration: '3 days/2 nights',
  maxAltitude: 'Low',
  tripType: 'Pilgrimage/Cultural',
  transport: 'Both by air and road',
  cost: '$400',
  highlights: [
    'Exquisite views of the world\'s famous mountain peaks',
    'Scenic flight over the Himalayas',
    'Very less tiring journey giving you more energy to explore nature'
  ]
};

const TripInformation = () => {
  return (
    <div className="wra">
      <div className="trip-details">
        <h2>Trip Information</h2>
        <div className="detail-row">
          <p>Destination:</p>
          <span>{tripData.destination}</span>
        </div>
        <div className="detail-row">
          <p>Trip Duration:</p>
          <span>{tripData.duration}</span>
        </div>
        <div className="detail-row">
          <p>Max. Altitude:</p>
          <span>{tripData.maxAltitude}</span>
        </div>
        <div className="detail-row">
          <p>Trip Type:</p>
          <span>{tripData.tripType}</span>
        </div>
        <div className="detail-row">
          <p>Transport:</p>
          <span>{tripData.transport}</span>
        </div>
        <div className="detail-row">
          <p>Cost:</p>
          <span>{tripData.cost}</span>
        </div>
      </div>
      <div className="highlights">
        <h3>Highlights</h3>
        <ul>
          {tripData.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>

        <NavLink to="/destinationselect">
            <button className="secondary-button">
              Book Now 
            </button>
          </NavLink>
      </div>
    </div>
  );
}

const Destination2 = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Lumbini
          </h1>
          <p className="primary-text">
          
Lumbini, located in the Rupandehi District of Nepal, is renowned as the birthplace of Siddhartha Gautama, who later became known as Lord Buddha, the founder of Buddhism. This sacred site holds immense significance for millions of Buddhists worldwide, drawing pilgrims and travelers seeking spiritual enlightenment and cultural exploration. Lumbini is nestled in the foothills of the Himalayas, surrounded by lush greenery and serene landscapes, creating an ambiance of tranquility and serenity.

Upon arrival in Lumbini, visitors are greeted by the awe-inspiring Mayadevi Temple, built to commemorate the birth of Lord Buddha. The temple stands at the exact spot where Queen Maya Devi is believed to have given birth to Siddhartha Gautama under a sacred sal tree. Pilgrims often offer prayers and pay homage at this sacred site, experiencing a profound sense of reverence and spiritual connection.
</p>
<p className="secondary-text">
Exploring Lumbini offers travelers a chance to delve into the rich history and cultural heritage of Buddhism. The Sacred Garden, a UNESCO World Heritage Site, encompasses several monasteries, temples, and shrines built by Buddhist communities from around the world. Each monastery showcases unique architectural styles and cultural influences, providing visitors with a glimpse into the diverse traditions and practices within Buddhism.

Apart from its religious significance, Lumbini also offers opportunities for introspection and meditation amidst its tranquil surroundings. Travelers can take leisurely strolls through the sprawling gardens, meditate under the shade of ancient trees, or participate in mindfulness sessions conducted by resident monks. The serene ambiance of Lumbini provides the ideal setting for spiritual rejuvenation and self-reflection.

Moreover, Lumbini serves as a hub for cultural exchange and interfaith dialogue, hosting numerous international conferences and events focused on peace, tolerance, and harmony. Visitors can engage in insightful discussions with Buddhist scholars, attend meditation retreats, or participate in community service projects aimed at promoting social welfare and environmental conservation.</p>
        </div>
        <div className="home-image-section">
          <img src={image2} alt="" />
        </div>
        <div className="home-image-sectionn">
          <img src={image22} alt="" />
        </div>
        {/* <div className="home-image-sectio">
          <img src={imagee1} alt="" />
        </div> */}
      </div>
      <TripInformation />
    </div>
  );
};

export default Destination2;
