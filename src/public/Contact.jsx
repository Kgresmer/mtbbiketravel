import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from "./Nav";

function Contact() {
  const [homepageData, setHomepageData] = useState({mainHeader: 'Default Main Heading', subHeader: 'Default Sub Heading', mainDescription: 'Default main description'});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5000/data/5dafb1bb572dcf1398bfbf70');
      setHomepageData(response.data);
      console.log(response)
    }

    fetchData();
  }, []);

  return (
    <div>
      <Nav />
      <h1>Contact Page</h1>
      <h1>{homepageData.mainHeader}</h1>
      <h3>{homepageData.subHeader}</h3>
      <p>{homepageData.mainDescription}</p>
    </div>
  );
}

export default Contact;
