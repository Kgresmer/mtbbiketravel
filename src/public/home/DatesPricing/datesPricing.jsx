import {useEffect, useState} from "react";
import React from "react";
import './datesPricing.css';

function DatesPricing() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    if (!typeof window === 'object') {
      return false;
    }

    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDate = () => {
    console.log('date one');
  }

  return (
    <>
      <div className={`tab-dates-section`}>
        <div className="flex-column">
          <div className="pricing-row">
            <p>Jun 23 - July 5</p>
            <p>$7500 / Person</p>
            <p className="available-date">Available</p>
            <p><input className="date-one-button" type="button" value="BOOK THIS SITE" onClick={handleDate}/></p>
          </div>
          <div className="pricing-row">
            <p>July 7 - July 13</p>
            <p>$7500 / Person</p>
            <p className="available-date">Available</p>
            <p><input className="date-one-button" type="button" value="BOOK THIS SITE" onClick={handleDate}/></p>
          </div>
          <div className="pricing-row">
            <p>July 15 - July 23</p>
            <p>$7500 / Person</p>
            <p className="available-date">Available</p>
            <p><input className="date-one-button" type="button" value="BOOK THIS SITE" onClick={handleDate}/></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DatesPricing;