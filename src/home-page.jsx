import React, {useEffect, useState} from 'react';


const HomePage = () => {
    const [bannerImage, setBannerImage] = useState('') ;

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
      <div style={{width: '100%'}}>
        <img style={{width: '80vw'}} src={bannerImage} alt='swiss mountains'/>
      </div>
    );
  }
;

export default HomePage;