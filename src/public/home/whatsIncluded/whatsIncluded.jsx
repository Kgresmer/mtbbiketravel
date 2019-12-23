import React, {useEffect, useState} from "react";
import './whatsIncluded.css';
import Itinerary from "../home";


export default function OverviewWhatsIncluded() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [tab, setTab] = useState({component: <WhatsIncludedTab/>, name: 'WhatsIncluded'});
  const lightGreenBackground = {'backgroundColor': '#30472c'};
  const darkGreenBackground = {'backgroundColor': 'white'};

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
        <div className="tab-heading-section">
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
          <div className={`tab-heading-w ${tab.name === 'Gear' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <Gear/>, name: 'Gear'})}>
            <h5>Gear</h5>
          </div>
        </div>
        <div className="inner-tab-content-section-w flex-column background-color-selected">
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
      <h1>Whats Included</h1>
      <p>Transportation to & from Zürich Airport</p>
      <p>6 Nights lodging in Scuol</p>
      <p>Transportation to riding destinations throughout the week</p>
      <p>Local guides that know every twist & turn for each adventure</p>
      <p>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and
      flexible attitude, as well as the local connections that our guides have make each and every trip
      spectacular.</p>
      <p>Daily Breakfast</p>
      <p>First & last night’s dinner</p>
      <p>Bike rental for week</p>
      <p>Osprey Raptor pack to keep</p>
      <p>Photo gallery</p>
      <p>Lift tickets at resorts throughout the week as needed</p>
      <p>Morning rafting trip on one of the most exciting white-water rivers in Europe</p>
      <p>What’s Not included:</p>

      <p>· Airfare to Zürich</p>
      <p>· Not all meals</p>
      <p>· Travel Insurance – required</p>
    </>
  )
}

function WhatsNot(props) {
  // const {data} = props;

  return (
    <>
      <h1>Whats Not</h1>
      <p>Transportation to & from Zürich Airport</p>
      <p>6 Nights lodging in Scuol</p>
      <p>Transportation to riding destinations throughout the week</p>
      <p>Local guides that know every twist & turn for each adventure</p>
      <p>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and
        flexible attitude, as well as the local connections that our guides have make each and every trip
        spectacular.</p>
      <p>Daily Breakfast</p>
      <p>First & last night’s dinner</p>
      <p>Bike rental for week</p>
      <p>Osprey Raptor pack to keep</p>
      <p>Photo gallery</p>
      <p>Lift tickets at resorts throughout the week as needed</p>
      <p>Morning rafting trip on one of the most exciting white-water rivers in Europe</p>
      <p>What’s Not included:</p>

      <p>· Airfare to Zürich</p>
      <p>· Not all meals</p>
      <p>· Travel Insurance – required</p>
    </>
  )
}

function Bikes(props) {
  // const {data} = props;

  return (
    <>
      <h1>Bikes</h1>
      <p>Transportation to & from Zürich Airport</p>
      <p>6 Nights lodging in Scuol</p>
      <p>Transportation to riding destinations throughout the week</p>
      <p>Local guides that know every twist & turn for each adventure</p>
      <p>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and
        flexible attitude, as well as the local connections that our guides have make each and every trip
        spectacular.</p>
      <p>Daily Breakfast</p>
      <p>First & last night’s dinner</p>
      <p>Bike rental for week</p>
      <p>Osprey Raptor pack to keep</p>
      <p>Photo gallery</p>
      <p>Lift tickets at resorts throughout the week as needed</p>
      <p>Morning rafting trip on one of the most exciting white-water rivers in Europe</p>
      <p>What’s Not included:</p>

      <p>· Airfare to Zürich</p>
      <p>· Not all meals</p>
      <p>· Travel Insurance – required</p>
    </>
  )
}

function Gear(props) {
  // const {data} = props;

  return (
    <>
      <h1>Gear</h1>
      <p>Transportation to & from Zürich Airport</p>
      <p>6 Nights lodging in Scuol</p>
      <p>Transportation to riding destinations throughout the week</p>
      <p>Local guides that know every twist & turn for each adventure</p>
      <p>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and
        flexible attitude, as well as the local connections that our guides have make each and every trip
        spectacular.</p>
      <p>Daily Breakfast</p>
      <p>First & last night’s dinner</p>
      <p>Bike rental for week</p>
      <p>Osprey Raptor pack to keep</p>
      <p>Photo gallery</p>
      <p>Lift tickets at resorts throughout the week as needed</p>
      <p>Morning rafting trip on one of the most exciting white-water rivers in Europe</p>
      <p>What’s Not included:</p>

      <p>· Airfare to Zürich</p>
      <p>· Not all meals</p>
      <p>· Travel Insurance – required</p>
    </>
  )
}

