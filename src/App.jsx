import React from 'react';
import './css/normalize.css';
import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
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
import Destinations from "./public/destinations/destinations";
import Footer from "./public/footer/footer";

library.add(fab, faCircleNotch);

function App() {

  return (
    <Router>
      <div>
        <Navigation/>

        <div className='app-content'>
        <Switch>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/destinations">
            <Destinations/>
          </Route>
          <Route exact path="/contact">
            <Contact/>
          </Route>
          <Route path="/">
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
