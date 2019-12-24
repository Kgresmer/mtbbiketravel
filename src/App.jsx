import React from 'react';
import './css/normalize.css';
import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./public/home/home";
import Contact from "./public/contact/contact";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import Navigation from "./public/nav/nav";
import Footer from "./public/footer/footer";

library.add(fab, faCircleNotch);

function App() {

  return (
    <Router>
      <div>
        <Navigation/>

        <div className='app-content'>
          <Switch>
            <Route  path="/home">
              <Home/>
            </Route>
            <Route  path="/home#Overview">
              <Home/>
            </Route>
            <Route  path="/home#Itinerary">
              <Home/>
            </Route>
            <Route  path="/home#WhatsIncluded">
              <Home/>
            </Route>
            <Route  path="/contact">
              <Contact/>
            </Route>
            <Route  path="/">
              <Home/>
            </Route>
          </Switch>
        </div>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
