import React, {useEffect, useState} from 'react';
import './gallery.css';
import CloseIcon from '@material-ui/icons/Close';

function Gallery() {
  const [thumbs, setThumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');

  const buildDisplayThumbnails = () => {
    const thumbArray = [];
    for (let i = 1; i < 40; i++) {
      const j = i % 2 === 0 ? 1 : 2;
      thumbArray[i] = `https://mtnbiketravel-gallery.s3.us-east-2.amazonaws.com/thumb-${j}.jpg`;
    }
    setThumbs(thumbArray);
  };

  useEffect(() => {

    buildDisplayThumbnails()
  }, []);

  const showImageModal = (index) => {
    const j = index % 2 === 0 ? 1 : 2;
    setModalPhoto(`https://mtnbiketravel-gallery.s3.us-east-2.amazonaws.com/full-${j}.jpg`);
    setShowModal(true);
  };

  const clearModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <main className="gallery-body">
        <h1>Gallery</h1>
          <div className="gallery-container">
            {thumbs.map((thumb, index) => {
              return (
                <div key={index} className="gallery-card" onClick={() => showImageModal(index)}>
                  <img src={thumb} />
                </div>
              );
            })}
          </div>
        <div className={`modal ${showModal ? 'show' : 'dontShow'}`} onClick={() => clearModal()}>
          <button><CloseIcon fontSize="large" /></button>
          <img src={modalPhoto} />
        </div>
      </main>
    </div>
  );
}

export default Gallery;
