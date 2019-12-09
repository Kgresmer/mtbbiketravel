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
import Login from "./public/login/Login";
import Nav from "./public/Nav";

library.add(fab, faCircleNotch);

function App() {

  return (
    <Router>
      <div>
        <Nav />

        <Switch>
          {/*<Route exact path="/contact">*/}
            {/*<Contact/>*/}
          {/*</Route>*/}
          {/*<Route exact path="/login">*/}
            {/*<Login/>*/}
          {/*</Route>*/}
          {/*<Route exact path="/admin">*/}
            {/*<Admin/>*/}
          {/*</Route>*/}
          <Route path="/">
            <About/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
