import React from 'react';
import './Destination.css';
import { NavLink } from 'react-router-dom';
import image3 from "../Assets/image3.png";
import image33 from "../Assets/image33.png";

const tripData = {
  destination: 'Bandipur',
  duration: '4 days/3 nights',
  maxAltitude: '1030m',
  tripType: 'Sightseeing,Adventure',
  transport: 'Both by air and road',
  cost: '$500',
  highlights: [
    'Exquisite views of the world\'s famous mountain peaks',
    'Scenic flight over the Himalayas',
    'Very less tiring journey giving you more energy to explore nature'
  ]
};

const TripInformation = () => {
  return (
    <div className="w">
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

        <NavLink to="/Booking">
            <button className="secondary-button">
              Book Now 
            </button>
          </NavLink>
      </div>
    </div>
  );
}

const Destination3 = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Bandipur
          </h1>
          <p className="primary-text">
          Bandipur, nestled in the hills of central Nepal, is a picturesque town that offers a delightful escape from the hustle and bustle of city life. With its well-preserved Newari architecture, charming cobblestone streets, and panoramic views of the Himalayas, Bandipur is a hidden gem waiting to be explored by travelers seeking an authentic cultural experience.

The town's rich history dates back to the 19th century when it was an important stop on the trade route between Tibet and India. Today, remnants of its trading past can still be seen in its beautifully restored buildings and traditional courtyards. Walking through Bandipur feels like stepping back in time, with its tranquil atmosphere and timeless charm.

</p>
<p className="secondary-text">
Nature lovers will find plenty to admire in Bandipur's surrounding hills and forests. The town is surrounded by lush greenery, offering opportunities for hiking, birdwatching, and exploring the natural beauty of the region. A hike to the nearby Thani Mai Temple provides stunning panoramic views of the surrounding mountains and valleys, making it a must-visit for outdoor enthusiasts.

In addition to its natural beauty, Bandipur is also known for its warm hospitality and vibrant culture. Visitors can immerse themselves in the local way of life by staying in traditional Newari guesthouses, sampling delicious local cuisine, and participating in cultural activities such as traditional dance performances and religious festivals.

Whether you're seeking adventure, relaxation, or cultural immersion, Bandipur has something to offer for every traveler. With its serene atmosphere, stunning scenery, and rich cultural heritage, it's no wonder that Bandipur is becoming an increasingly popular destination for travelers looking to experience the authentic charm of Nepal.</p>
        </div>
        <div className="home-image-section">
          <img src={image3} alt="" />
        </div>
        <div className="home-image-sectionn">
          <img src={image33} alt="" />
        </div>
      </div>
      <TripInformation />
    </div>
  );
};

export default Destination3;
