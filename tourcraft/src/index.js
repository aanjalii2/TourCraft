import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import Home from "./Components/Home";
//import About from "./Components/About";
import { BrowserRouter } from 'react-router-dom';
//import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Providers from "./app/providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
        {/* <About/>
      <Contact/> */}
        <Footer />
      </BrowserRouter>
     </Providers>
  </React.StrictMode>

);

// index.js
