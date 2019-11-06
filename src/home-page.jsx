import React, {useEffect, useState} from 'react';
import ImageUploader from 'react-images-upload';
import axios from "axios";
import FormData from 'form-data'


const HomePage = () => {
    const [bannerImage, setBannerImage] = useState('');
    const [pic, setPic] = useState({});

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

    const onDrop = (picture) => {
      setPic(picture.target.files[0]);
      if (picture) {
        const formData = new FormData();
        formData.append('file', picture.target.files[0], {type: 'file'});
        formData.append('name', 'kevin.jpg');
        axios.post('http://localhost:5000/photo', formData, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Access-Control-Allow-Origin': '*',
            'content-type': 'undefined'
          }
        }).then((response) => {
            console.log(response);
          }
        ).catch((error) => {
            console.log(error);
          }
        )
      }
    };

    const onSubmit = () => {

    }

    return (
      <div style={{width: '100%'}}>
        <img style={{width: '80vw'}} src={bannerImage} alt='swiss mountains'/>
        <form action="http://localhost:5000/photo" method="post" encType="multipart/form-data">
          <input type="file" name="file" onChange={p => onDrop(p)}/>
          <input type="submit" value="Upload" />
        </form>
      </div>
    );
  }
;

export default HomePage;