import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./home-page";

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
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>


        <div className="App">
          <header className="App-header">
            <h1>{homepageData.title}</h1>
            <h3>{homepageData.summary}</h3>
          </header>
        </div>

        <Switch>
          <Route exact={true} path="/about">
            <About />
          </Route>
          <Route exact={true} path="/contact">
            <contact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
