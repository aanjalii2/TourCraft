
import { Routes, Route } from 'react-router-dom';
import About from "./Components/About";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import NavBar from './Components/Navbar';
import Footer from "./Components/Footer";
import Help from './Components/Help';
import Signup from './Components/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify";
import "./App.css";
import LoginPage from './Components/LoginPage';
import DestinationSelect from './Components/DestinationSelect';
import Destination3 from './Components/Destination3';
import Booking from './Components/Booking';
import Feedback from './Components/Feedback';
import ConfirmationPage from './Components/ConfirmationPage';
import CheckoutForm from './Components/CheckOutForm';
import Profile from './Components/Profile';
import PaymentForm from './Components/Stripe'

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
         
          <Route path="/destination/:destinationId" element={<Destination3 />} />
          <Route path="/booking/:destinationId/:tripid" element={<Booking/>} />
          {/* <Route path='/booking' element={<Booking />} /> */}
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/confirmation/:bookingId' element={<ConfirmationPage />} />
          <Route path='/khalti/:bookingId' element={<CheckoutForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/stripe' element={<PaymentForm />} />
       </Routes>
    <ToastContainer/>

    </div>
  
 );
};

export default App;
// App.js

