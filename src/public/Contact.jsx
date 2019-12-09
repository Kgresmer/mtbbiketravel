import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';


function Contact() {
  const [homepageData, setHomepageData] = useState({
    mainHeader: 'Default Main Heading',
    subHeader: 'Default Sub Heading',
    mainDescription: 'Default main description'
  });
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
      <Card>
        <img className="" src={bannerImage} alt='swiss mountains'/>
        <h1>Contact Page</h1>
        <h1>{homepageData.mainHeader}</h1>
        <h3>{homepageData.subHeader}</h3>
        <p>{homepageData.mainDescription}</p>
      </Card>
    </div>
  );
}

export default Contact;
