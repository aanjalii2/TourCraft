import React from 'react';
import './Destination.css';
import { NavLink } from 'react-router-dom';
import image1 from "../Assets/image1.png";
import image11 from "../Assets/image11.png";

const tripData = {
  destination: 'Pokhara',
  duration: '3 days/2 nights',
  maxAltitude: '1400m',
  tripType: 'Sightseeing,Adventure',
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
    <div className="wrap">
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

const Destination1 = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Pokhara
          </h1>
          <p className="primary-text">
          Pokhara, nestled in the tranquil valleys of Nepal, is a mesmerizing destination that beckons travelers with its serene beauty and enchanting landscapes. As the second-largest city in Nepal and often referred to as the "Gateway to the Annapurna Circuit," Pokhara is renowned for its stunning views of the Himalayas, including the majestic peaks of Machapuchare (Fishtail), Annapurna, and Dhaulagiri.

The city's picturesque setting is accentuated by the serene Phewa Lake, where travelers can enjoy boat rides amidst the tranquil waters while soaking in the panoramic views of the surrounding mountains. The lakeside area also boasts a vibrant atmosphere with numerous cafes, restaurants, and shops offering local delicacies and handicrafts, making it a perfect spot for leisurely strolls and cultural immersion.

Adventure enthusiasts flock to Pokhara for its plethora of outdoor activities, including paragliding, trekking, and white-water rafting. The city serves as a gateway to some of the most popular trekking routes in the world, such as the Annapurna Base Camp and the Poon Hill trek, offering travelers the opportunity to embark on unforgettable journeys through lush forests, cascading waterfalls, and traditional Nepalese villages.


</p>
<p className="secondary-text">
Pokhara is not only a haven for adventure seekers but also a sanctuary for spiritual rejuvenation. The city is dotted with ancient temples and monasteries, including the revered Bindhyabasini Temple and the World Peace Pagoda, where visitors can immerse themselves in meditation and contemplation amidst the tranquil surroundings.

At night, Pokhara transforms into a lively hub of entertainment with vibrant nightlife options, including live music performances, cultural shows, and bustling markets offering local handicrafts and souvenirs. Whether seeking adventure, relaxation, or cultural exploration, Pokhara offers a diverse range of experiences that captivate the hearts of travelers from around the globe.

Pokhara is not only a haven for adventure seekers but also a sanctuary for spiritual rejuvenation. The city is dotted with ancient temples and monasteries, including the revered Bindhyabasini Temple and the World Peace Pagoda, where visitors can immerse themselves in meditation and contemplation amidst the tranquil surroundings.

At night, Pokhara transforms into a lively hub of entertainment with vibrant nightlife options, including live music performances, cultural shows, and bustling markets offering local handicrafts and souvenirs. Whether seeking adventure, relaxation, or cultural exploration, Pokhara offers a diverse range of experiences that captivate the hearts of travelers from around the globe.
</p>
        </div>
        <div className="home-image-section">
          <img src={image1} alt="" />
        </div>
        <div className="home-image-sectionn">
          <img src={image11} alt="" />
        </div>
        {/* <div className="home-image-sectio">
          <img src={imagee1} alt="" />
        </div> */}
      </div>
      <TripInformation />
    </div>
  );
};

export default Destination1;
