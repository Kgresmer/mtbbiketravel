import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './home.css';
import Itinerary from "./itinerary/Itinerary";
import WhatsIncluded from "./whatsIncluded/whatsIncluded";
import {withRouter} from "react-router-dom";


function Overview() {
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

  return (
    <>
      <div className={`tab-text-section ${windowSize > 768 ? 'tab-text-section-large' : ''}`}>
        <div className="flex-column">
          <div className="flex-row">
            <div className="">
              <p className="font-weight-bold">Ready to challenge yourself, enjoy great scenery and a little luxury?</p>
              <br></br>
              <p>Join us for a week of biking in the Swiss Alps.</p>
              <p>Basecamp in Scuol is in a small village nestled in the Alps in eastern Switzerland
                near the Austrian-Italian border. It’s remote and crowd-free. The week of riding
                includes some big days of pedaling multiple days in a row. Climbing is limited, but
                when it’s time, it’s a steep one. You’ll encounter trails with exposure, the need to
                let go of the brakes and maybe find it’s time to roll down a two foot drop.</p>
              <p>If you love being on your bike, are an experienced rider and want a new
                challenge, this is for you.</p>
              <p>As for the luxury: A gorgeous lodge, chilled beer, one of the oldest spa complexes
                in Europe and day trips to remember.</p>
            </div>
          </div>
        </div>
      </div>
      {(windowSize > 768 && windowSize < 1099) && <div className="tab-image-section" >
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="640" height="640"></iframe>
      </div>}
      {(windowSize >= 1100 && windowSize < 1350) && <div className="tab-image-section" >
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="710" height="640"></iframe>
      </div>}
      {windowSize > 1350 && <div className="tab-image-section" >
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="840" height="640"></iframe>
      </div>}
    </>
  )
}

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
  const darkGreenBackground = {'backgroundColor': '#30472c'};
  const lightGreenBackground = {'backgroundColor': '#4a7740'};

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
    const tabElements = document.getElementById('Overview');
    if (tabElements) {
      const y = tabElements.scrollHeight - 25;
      console.log(y)

      if (window.location.hash === '#Itinerary') {
        switchTab({component: <Itinerary/>, name: 'Itinerary'});
        window.scrollTo(0, y)
      } else if (window.location.hash === '#WhatsIncluded') {
        switchTab({component: <WhatsIncluded/>, name: 'WhatsIncluded'});
        window.scrollTo(0, y)
      } else if (window.location.hash === '#Overview') {
        switchTab({component: <Overview/>, name: 'Overview'});
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
            <div className="tab-heading last-tab"
                 style={tab.name === 'WhatsIncluded' ? lightGreenBackground : darkGreenBackground}
                 onClick={() => switchTab({component: <WhatsIncluded/>, name: 'WhatsIncluded'})}>
              <h5>Whats Included</h5>
            </div>
            <div className="tab-heading-offset"></div>
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
              <h5>Whats Included</h5>
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
      <main className="">
        <section className="hero-section" style={bannerImage} id="home">
          <div className="image-caption">Unique, mountain bike adventures, organized by local experts</div>
        </section>

        <section className="trip-info-section" id="Overview">
          <div className="flex-row">
            <div className="overview-tab-banner">
              <h3>SCOUL SWISS ALPS TRIP</h3>
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
