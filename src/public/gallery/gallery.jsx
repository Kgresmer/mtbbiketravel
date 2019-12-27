import React, {useEffect, useState} from 'react';
import './gallery.css';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";

function Gallery() {
  const [thumbs, setThumbs] = useState([]);
  const [thumbsNumArr, setThumbsNumArr] = useState([]);
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
        setThumbsNumArr(thumbsArr);
        buildDisplayThumbnails(thumbsArr, 19)
      }
    }

    fetchData();

  }, []);

  const showImageModal = (index) => {
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
  }

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
        <div className={`modal ${showModal ? 'show' : 'dontShow'}`} onClick={() => clearModal()}>
          <button><CloseIcon fontSize="large" /></button>
          <img src={modalPhoto} />
        </div>
        {!disableShowMore && <div className="showMoreContainer">
          <button onClick={showMorePhotos}>Show More</button>
        </div>}
      </main>
    </div>
  );
}

export default Gallery;
