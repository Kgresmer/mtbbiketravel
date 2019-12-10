import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';


function Home() {
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
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    } else if (w >= 480 && w < 780) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    } else if (w >= 780 && w < 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    } else if (w >= 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    }
  };

  useEffect(() => {
    determineScreenSize();
  });

  return (
    <div>
      <main>
          <section className="hero-section">
              <figure className="hero">
                  <img className="hero-img" src={bannerImage} alt='swiss mountains'/>
                  <figcaption className="hero-caption">Coming Soon!</figcaption>
              </figure>
          </section>
      </main>
    </div>
    
  );
}

export default Home;
