import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './home.css';
import Itinerary from "./itinerary/Itinerary";
import WhatsIncluded from "./whatsIncluded/whatsIncluded";
import Overview from "./overview/overview";
import {withRouter} from "react-router-dom";
import DatesPricing from "./DatesPricing/datesPricing";


function Home(props) {
  const { location } = props;
  const [homepageData, setHomepageData] = useState({
    mainHeader: 'Default Main Heading',
    subHeader: 'Default Sub Heading',
    mainDescription: 'Default main description'
  });
  const [bannerImage, setBannerImage] = useState({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg)'});
  const [tab, setTab] = useState({component: <Overview/>, name: 'Overview'});
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const darkGreenBackground = {'backgroundColor': '#E9E9E9'};
  const lightGreenBackground = {'backgroundColor': 'white', 'border-bottom': 'none'};

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5000/data/5dafb1bb572dcf1398bfbf70');
      setHomepageData(response.data);
      console.log(response)
    }

    //determineScreenSize();

    //fetchData();
  }, []);

  useEffect(() => {
    document.title = "MTN Bike Travel, Cycling Adventure in Switzerland"
  }, []);

  useEffect(() => {
    const tabElements = document.getElementById('Overview');
    if (tabElements) {
      const y = tabElements.scrollHeight - 25;

      if (window.location.hash === '#Itinerary') {
        switchTab({component: <Itinerary/>, name: 'Itinerary'});
        window.scrollTo(0, y)
      } else if (window.location.hash === '#WhatsIncluded') {
        switchTab({component: <WhatsIncluded/>, name: 'WhatsIncluded'});
        window.scrollTo(0, y)
      } else if (window.location.hash === '#Overview') {
        switchTab({component: <Overview/>, name: 'Overview'});
      } else if (window.location.hash === '#DatesPricing') {
        switchTab({component: <DatesPricing/>, name: 'DatesPricing'});
        window.scrollTo(0, y)
      }
    }
  }, [location.hash]);

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

  const determineScreenSize = () => {

    if (windowSize < 480) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    } else if (windowSize >= 480 && windowSize < 780) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    } else if (windowSize >= 780 && windowSize < 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    } else if (windowSize >= 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg');
    }
  };

  const switchTab = (selectedTab) => {
    setTab(selectedTab);
  };

  const displayTabSelectors = () => {
    if (windowSize > 768) {
      return (
        <div className="tab-section">
          <div className="tab-heading-section">
            <div className="tab-heading first-tab"
                 style={tab.name === 'Overview' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <Overview/>, name: 'Overview'})}>
              <h5>Overview</h5>
            </div>
            <div className="tab-heading"
                 style={tab.name === 'Itinerary' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <Itinerary/>, name: 'Itinerary'})}>
              <h5>Itinerary</h5>
            </div>
            <div className="tab-heading"
                 style={tab.name === 'WhatsIncluded' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <WhatsIncluded/>, name: 'WhatsIncluded'})}>
              <h5>What's Included</h5>
            </div>
            <div className="tab-heading last-tab"
                 style={tab.name === 'DatesPricing' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <DatesPricing/>, name: 'DatesPricing'})}>
              <h5>Dates & Pricing</h5>
            </div>
            <div className="tab-heading-offset"></div>
          </div>
          <div className={`${tab.name === 'WhatsIncluded' ? 'tab-content-section-w' : 'tab-content-section'} flex-row background-color-selected`}>
            {tab.component}
          </div>
        </div>
      )
    } else {
      return (
        <div className="tab-section">
          <div className="tab-heading-section">
            <div className="tab-heading"
                 style={tab.name === 'Overview' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <Overview/>, name: 'Overview'})}>
              <h5>Overview</h5>
            </div>
            <div className="tab-heading"
                 style={tab.name === 'Itinerary' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <Itinerary/>, name: 'Itinerary'})}>
              <h5>Itinerary</h5>
            </div>
            <div className="tab-heading"
                 style={tab.name === 'WhatsIncluded' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <WhatsIncluded/>, name: 'WhatsIncluded'})}>
              <h5>What's Included</h5>
            </div>
            <div className="tab-heading"
                 style={tab.name === 'DatesPricing' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <DatesPricing/>, name: 'DatesPricing'})}>
              <h5>Dates & Pricing</h5>
            </div>
          </div>
          <div className={`${tab.name === 'WhatsIncluded' ? 'tab-content-section-w' : 'tab-content-section'} flex-row background-color-selected`}>
            <div className="tab-text-section">{tab.component}</div>
          </div>
        </div>
      )
    }
  };


  return (
    <div>
      <section className="hero-section" alt="mountain bike trail switzerland" style={bannerImage} id="home">
        <div className="image-caption">Unique mountain bike adventures organized by local experts</div>
      </section>
      <main className="">
        <section className="trip-info-section" id="Overview">
          <div className="flex-row">
            <div className="overview-tab-banner">
              <h3>SCUOL SWISS ALPS MOUNTAIN BIKE TRIP</h3>
            </div>
          </div>
          {displayTabSelectors()}
        </section>

        <section className="">

        </section>
      </main>
    </div>

  );
}

export default withRouter(Home);
