// // App.js
// import { Routes, Route } from 'react-router-dom';
// import About from "./Components/About";
// import Home from "./Components/Home";
// import Contact from "./Components/Contact";
// import NavBar from './Components/Navbar';
// import Footer from "./Components/Footer";
// import Help from './Components/Help';
// import Signup from './Components/Signup';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer} from "react-toastify"

// import "./App.css";
// import LoginPage from './Components/LoginPage';
// import DestinationSelect from './Components/DestinationSelect';
// import Destination1 from './Components/Destination1';
// import Destination2 from './Components/Destination2';
// import Destination3 from './Components/Destination3';

// const App = () => {
//  return (
//   <div className="App">
   
//      <NavBar />
//        <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/help" element={<Help />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/about" element={<Footer />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/destinationselect" element={<DestinationSelect />} />
//           <Route path="/pokhara" element={<Destination1 />} />
//           <Route path="/lumbini" element={<Destination2 />} />
//           <Route path="/bandipur" element={<Destination3 />} />
//        </Routes>
    
//     <ToastContainer/>

//     </div>
//  );
// };

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from "./Components/About";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import NavBar from './Components/Navbar';
import Footer from "./Components/Footer";
import Help from './Components/Help';
import Signup from './Components/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify"

import "./App.css";
import LoginPage from './Components/LoginPage';
import DestinationSelect from './Components/DestinationSelect';
import Destination1 from './Components/Destination1';
import Destination2 from './Components/Destination2';
import Destination3 from './Components/Destination3';
import Booking from './Components/Booking';
import Feedback from './Components/Feedback';

const App = () => {
 return (
    <div className="App">
   
     <NavBar />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<Footer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/destinationselect" element={<DestinationSelect />} />
          <Route path="/pokhara" element={<Destination1 />} />
          <Route path="/lumbini" element={<Destination2 />} />
          <Route path="/bandipur" element={<Destination3 />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/feedback' element={<Feedback />} />
       </Routes>
    
    <ToastContainer/>

    </div>
  
 );
};

export default App;