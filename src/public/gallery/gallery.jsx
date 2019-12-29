import React, {useEffect, useState} from 'react';
import './gallery.css';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Gallery() {
  const [thumbs, setThumbs] = useState([]);
  const [thumbsNumArr, setThumbsNumArr] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [disableShowMore, setDisableShowMore] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const [numOfPhotosShown, setNumOfPhotosShown] = useState(19);

  const buildDisplayThumbnails = (thumbsArr, numOfPhotos) => {
    const temp = [];
    for (let i = 0; i < thumbsArr.length; i++) {
      temp[i] = {url:`https://mtnbiketravel-gallery.s3.us-east-2.amazonaws.com/thumb-${thumbsArr[i]}.jpg`, num: thumbsArr[i]};
      if (i === numOfPhotos) break;
    }
    setThumbs(temp);
  };

  useEffect(() => {
    let thumbsArr = [];
    async function fetchData() {
      const response = await axios.get('https://mtnbiketravel-gallery.s3.amazonaws.com/?list-type=2');
      if (response && response.data) {
        let regexp = /thumb-\d(\d)?(\d)?/g;
        let thumbsTemp = [...response.data.matchAll(regexp)];
        thumbsTemp.forEach(thumb => {
          const num = thumb[0].substr(6, 3);
          if(thumbsArr.indexOf(num) === -1) {
            thumbsArr.push(num)
          }
        });
        const sorted = thumbsArr.sort(function(a, b){return a-b});
        setThumbsNumArr(sorted);
        buildDisplayThumbnails(thumbsArr, 19)
      }
    }

    fetchData();

  }, []);

  const keydown = (event) => {
    if (event.keyCode === 37) {
      scrollBackPhoto(true);
    }
    if (event.keyCode === 39) {
      scrollForwardPhoto(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, [thumbsNumArr]);

  const showImageModal = (index) => {
    setPhotoIndex(index);
    setModalPhoto(`https://mtnbiketravel-gallery.s3.us-east-2.amazonaws.com/full-${index}.jpg`);
    setShowModal(true);
  };

  const clearModal = () => {
    setShowModal(false);
  };

  const showMorePhotos = () => {
    const numPhotosShownCurrent = numOfPhotosShown + 20;
    setNumOfPhotosShown(numPhotosShownCurrent);
    buildDisplayThumbnails(thumbsNumArr, numPhotosShownCurrent);
    if (numPhotosShownCurrent > thumbsNumArr.length) {
      setDisableShowMore(true);
    }
  };

  const scrollBackPhoto = (fromArrow) => {
    let newIndex;
    if (fromArrow) {
      const m = document.getElementById('modal-photo');
      const numStr = m.src.split('full-')[1];
      const num = numStr.split('.')[0];
      newIndex = +num - 1;
    } else {
      newIndex = +photoIndex - 1;
    }
    if (newIndex === 0) {
      newIndex = thumbsNumArr[thumbsNumArr.length -1];
    }
    setPhotoIndex(newIndex);
    setModalPhoto(`https://mtnbiketravel-gallery.s3.us-east-2.amazonaws.com/full-${newIndex}.jpg`);
  };

  const scrollForwardPhoto = (fromArrow) => {
    let newIndex;
    if (fromArrow) {
      const m = document.getElementById('modal-photo');
      const numStr = m.src.split('full-')[1];
      const num = numStr.split('.')[0];
      newIndex = +num + 1;
    } else {
      newIndex = +photoIndex + 1;
    }
    if (newIndex > thumbsNumArr[thumbsNumArr.length -1]) {
      newIndex = thumbsNumArr[0];
    }
    setPhotoIndex(newIndex);
    setModalPhoto(`https://mtnbiketravel-gallery.s3.us-east-2.amazonaws.com/full-${newIndex}.jpg`);
  };

  return (
    <div>
      <main className="gallery-body">
        <h1>Gallery</h1>
          <div className="gallery-container">
            {thumbs.map((thumb, index) => {
              try {
                return (
                  <div key={index} className="gallery-card" onClick={() => showImageModal(thumb.num)}>
                    <img src={thumb.url}/>
                  </div>
                );
              } catch (err) {
                console.log('err caught')
                console.log(err);
              }
            })}
          </div>
        <div className={`modal ${showModal ? 'show' : 'dontShow'}`}>
          <button className="close-gallery-modal"><CloseIcon fontSize="large" onClick={() => clearModal()}/></button>
          <ArrowBackIosIcon className="arrow" onClick={scrollBackPhoto} color="primary" fontSize="large" />
          <img id="modal-photo" src={modalPhoto} />
          <ArrowForwardIosIcon className="arrow" onClick={scrollForwardPhoto} color="primary" fontSize="large" />
        </div>
        {!disableShowMore && <div className="showMoreContainer">
          <button onClick={showMorePhotos}>Show More</button>
        </div>}
      </main>
    </div>
  );
}

export default Gallery;
