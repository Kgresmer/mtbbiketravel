import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./public/home-page";
import About from "./public/About";
import Contact from "./public/Contact";

function App() {
  const [homepageData, setHomepageData] = useState({ title: 'Default Title', summary: 'Default Biking Stuff' });

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5000/data/5dafb1bb572dcf1398bfbf70');
      setHomepageData(response.data);
      console.log(response)
    }
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <h3>{homepageData.title}</h3>
          <h4>{homepageData.summary}</h4>
        </nav>


        <div className="App">
        </div>

        <Switch>
          <Route exact={true} path="/about">
            <About />
          </Route>
          <Route exact={true} path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
          <Route component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
