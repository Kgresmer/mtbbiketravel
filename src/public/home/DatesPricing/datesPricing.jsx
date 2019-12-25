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

  const showPrices = () => {
    if (windowSize > 768) {
      return (
        <div className={`tab-dates-section`}>
          <div className="flex-column">
            <div className="pricing-row title-row">
              <p></p>
              <p>Dates</p>
              <p>Riding Guest</p>
              <p>Non-riding Spouse/Partner</p>
              <p></p>
              <p></p>
            </div>
            <div className="pricing-row">
              <p>Week #1</p>
              <p>9/5/2020 through 9/11/2020</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS SITE" onClick={handleDate}/></p>
            </div>
            <div className="pricing-row">
              <p>Week #2</p>
              <p>9/12/2020 through 9/18/2020</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS SITE" onClick={handleDate}/></p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`tab-dates-section`}>
          <div className="flex-column">
            <h5>Week #1</h5>
            <div className="pricing-row">
              <p>9/5/2020 through 9/11/2020</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS SITE" onClick={handleDate}/></p>
            </div>
            <h5>Week #2</h5>
            <div className="pricing-row">
              <p>9/12/2020 through 9/18/2020</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS SITE" onClick={handleDate}/></p>
            </div>
            <h5>Prices</h5>
            <div className="pricing-row title-row">
              <p>Riding Guest</p>
              <p>Non-riding Spouse/Partner</p>
            </div>
            <div className="pricing-row">
              <p>$4,000</p>
              <p>$3,000</p>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      {showPrices()}
    </>
  )
}

export default DatesPricing;