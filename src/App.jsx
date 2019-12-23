import React from 'react';
import './css/normalize.css';
import './css/App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Admin from "./admin/admin";
import Home from "./public/home/home";
import Contact from "./public/contact/contact";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import Login from "./public/login/Login";
import Navigation from "./public/nav/nav";
import Footer from "./public/footer/footer";

library.add(fab, faCircleNotch);

function App() {

  return (
    <Router>
      <div>
        <Navigation/>

        <div className='app-content'>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/home#Overview">
            <Home/>
          </Route>
          <Route exact path="/home#Itinerary">
            <Home/>
          </Route>
          <Route exact path="/home#WhatsIncluded">
            <Home/>
          </Route>
          <Route exact path="/contact">
            <Contact/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </div>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
