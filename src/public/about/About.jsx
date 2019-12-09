import React, { useEffect, useState } from 'react';
import axios from 'axios';
import headerImage from '../assets/mtnbiketravel-logo.png';
import './about.css';


function About() {
  const [homepageData, setHomepageData] = useState({mainHeader: 'Default Main Heading', subHeader: 'Default Sub Heading', mainDescription: 'Default main description'});
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5000/data/5dafb1bb572dcf1398bfbf70');
      setHomepageData(response.data);
      console.log(response)
    }

    fetchData();
  }, []);

  const determineScreenSize = () => {
    const w = window.innerWidth;
    if (w < 480) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban-205.jpg');
    } else if (w >= 480 && w < 780) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban-561.jpg');
    } else if (w >= 780 && w < 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban-907.jpg');
    } else if (w >= 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-banner-1-9.jpg');
    }
  };

  useEffect(() => {
    determineScreenSize();
  });


  return (
    <div>
      <header>
        <div className="left-nav col">
            <figure className="logo">
                <img  src={headerImage} alt="Mountain Bike Travel logo"/>
            </figure>
        </div>

        <nav className="right-nav col">
            <ul className="main-nav">
                <li className="nav-item"><a href="#">Home</a></li>
                <li className="nav-item"><a href="#">Destinations</a></li>
                <li className="nav-item"><a href="#">Contact</a></li>
            </ul>
        </nav>
      </header>

      <main>
          <section className="hero-section">
              <figure className="hero">
                  <img className="hero-img" src={bannerImage} alt='swiss mountains'/>
                  <figcaption className="hero-caption">Unique, hardcore mountain bike adventures organized by local experts.</figcaption>
              </figure>
          </section>

          <section className="trip-info-section">


          </section>
      </main>

      <footer>

      </footer>
    </div>
    
  );
}

export default About;
