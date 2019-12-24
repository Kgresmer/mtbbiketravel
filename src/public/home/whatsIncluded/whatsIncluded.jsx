import React, {useEffect, useState} from "react";
import './whatsIncluded.css';
import Itinerary from "../home";


export default function OverviewWhatsIncluded() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [tab, setTab] = useState({component: <WhatsIncludedTab/>, name: 'WhatsIncluded'});

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

  const switchTab = (selectedTab) => {
    setTab(selectedTab);
  };

  return (
    <>
      <div className="tab-section-w">
        <div className="tab-banner-w">
          <div className="banner">
            <h3>What's Included</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.</p>
          </div>
        </div>
        <div className="tab-heading-section">
          <div className="tab-heading-offset"></div>
          <div className={`tab-heading-w ${tab.name === 'WhatsIncluded' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <WhatsIncludedTab/>, name: 'WhatsIncluded'})}>
            <h5>Whats Included</h5>
          </div>
          <div className={`tab-heading-w ${tab.name === 'WhatsNot' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <WhatsNot/>, name: 'WhatsNot'})}>
            <h5>Whats Not</h5>
          </div>
          <div className={`tab-heading-w ${tab.name === 'Bikes' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <Bikes/>, name: 'Bikes'})}>
            <h5>Bikes</h5>
          </div>
          <div className={`tab-heading-w ${tab.name === 'Gear' ? 'activeHeading' : ''} last-tab`}
               onClick={() => switchTab({component: <Gear/>, name: 'Gear'})}>
            <h5>Gear</h5>
          </div>
          <div className="tab-heading-offset"></div>
        </div>
        <div className="inner-tab-content-section-w background-color-selected">
          {tab.component}
        </div>
      </div>
    </>
  )
}

function WhatsIncludedTab(props) {
  // const {data} = props;

  return (
    <>
      <div className="flex-row whats-included-section">
        <div className="flex-1">
          <ul>
          <li>Transportation to & from Zürich Airport</li>
          <li>6 Nights lodging in Scuol</li>
          <li>Transportation to riding destinations throughout the week</li>
          <li>Local guides that know every twist & turn for each adventure</li>
          <li>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and
            flexible attitude, as well as the local connections that our guides have make each and every trip
            spectacular.</li>
          <li>Daily Breakfast</li>
          <li>First & last night’s dinner</li>
          <li>Bike rental for week</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
          <li>Osprey Raptor pack to keep</li>
          <li>Photo gallery</li>
          <li>Lift tickets at resorts throughout the week as needed</li>
          <li>Morning rafting trip on one of the most exciting white-water rivers in Europe</li>
          <li>What’s Not included:</li>

          <li>· Airfare to Zürich</li>
          <li>· Not all meals</li>
          <li>· Travel Insurance – required</li>
          </ul>
        </div>
      </div>
    </>
  )
}

function WhatsNot(props) {
  // const {data} = props;

  return (
    <>
      <div className="flex-row whats-included-section">
        <div className="flex-1">
          <ul>
            <li>Transportation to & from Zürich Airport</li>
            <li>6 Nights lodging in Scuol</li>
            <li>Transportation to riding destinations throughout the week</li>
            <li>Local guides that know every twist & turn for each adventure</li>
            <li>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and
              flexible attitude, as well as the local connections that our guides have make each and every trip
              spectacular.</li>
            <li>Daily Breakfast</li>
            <li>First & last night’s dinner</li>
            <li>Bike rental for week</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li>Osprey Raptor pack to keep</li>
            <li>Photo gallery</li>
            <li>Lift tickets at resorts throughout the week as needed</li>
            <li>Morning rafting trip on one of the most exciting white-water rivers in Europe</li>
            <li>What’s Not included:</li>

            <li>· Airfare to Zürich</li>
            <li>· Not all meals</li>
            <li>· Travel Insurance – required</li>
          </ul>
        </div>
      </div>
    </>
  )
}

function Bikes(props) {
  // const {data} = props;

  return (
    <>
      <div className="flex-row">
        <div className="bike-section">
          <img className="" src="bike.jpeg"/>
          <p>This is a good bike i hear. </p>
        </div>
        <div className="bike-section right-section">
          <img className="" src="bike.jpeg"/>
          <p>This is another bike. </p>
        </div>
      </div>
    </>
  )
}

function Gear(props) {
  // const {data} = props;

  return (
    <>
      <div className="flex-row whats-included-section">
        <div className="flex-1">
          <ul>
            <li>Transportation to & from Zürich Airport</li>
            <li>6 Nights lodging in Scuol</li>
            <li>Transportation to riding destinations throughout the week</li>
            <li>Local guides that know every twist & turn for each adventure</li>
            <li>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and
              flexible attitude, as well as the local connections that our guides have make each and every trip
              spectacular.</li>
            <li>Daily Breakfast</li>
            <li>First & last night’s dinner</li>
            <li>Bike rental for week</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul>
            <li>Osprey Raptor pack to keep</li>
            <li>Photo gallery</li>
            <li>Lift tickets at resorts throughout the week as needed</li>
            <li>Morning rafting trip on one of the most exciting white-water rivers in Europe</li>
            <li>What’s Not included:</li>

            <li>· Airfare to Zürich</li>
            <li>· Not all meals</li>
            <li>· Travel Insurance – required</li>
          </ul>
        </div>
      </div>
    </>
  )
}

