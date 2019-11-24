import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Admin from "./admin/admin";
import About from "./public/About";
import Contact from "./public/Contact";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCircleNotch);

function App() {

  return (
    <Router>
      <div>
        <div className="App">
        </div>

        <Switch>
          <Route exact={true} path="/about">
            <About/>
          </Route>
          <Route exact={true} path="/contact">
            <Contact/>
          </Route>
          <Route path="/">
            <Admin/>
          </Route>
          <Route component={Admin}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
