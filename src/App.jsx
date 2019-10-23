import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [homepageData, setHomepageData] = useState({ title: 'Default Title', summary: 'Default Biking Stuff' });

  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        url: 'http://localhost:5000/data/5dafb1bb572dcf1398bfbf70',
        method: 'get'
      });
      setHomepageData(response.data);
      console.log(response)
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{homepageData.title}</h1>
        <h3>{homepageData.summary}</h3>
      </header>
    </div>
  );
}

export default App;
