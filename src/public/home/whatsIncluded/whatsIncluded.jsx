import React, {useEffect, useState} from "react";
import './whatsIncluded.css';

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

  useEffect(() => {
    document.title = "What's Included, What's Not, Bikes, Gear"
  }, []);

  return (
    <>
      <div className="tab-section-w">
        <div className="tab-banner-w">
          <div className="banner">
            <h3>What's Included</h3>
            <p>There is nothing like the relaxed atmosphere and adventure of the small-town Swiss culture in the Alps.
              From the minute you get on the train in Zurich, every detail of trip is about enjoying the moment.
              We encourage non-riding spouses/partners to join us on the trip.  There are lots of things to do and
              see while the group is out on the riding excursions including visiting the only <a href="https://www.nationalpark.ch/de/">National Park</a> in
              Switzerland or just exploring the <a href="https://www.skiresort.info/ski-resort/scuol-motta-naluns/">local mountain resort</a> in Scuol. </p>
          </div>
        </div>
        <div className="flex-row">
          <div className="tab-heading-offset"></div>
          <div className={`tab-heading-w ${tab.name === 'WhatsIncluded' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <WhatsIncludedTab/>, name: 'WhatsIncluded'})}>
            <h5 className={'tab-title-w'}>What's Included</h5>
          </div>
          <div className={`tab-heading-w ${tab.name === 'WhatsNot' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <WhatsNot/>, name: 'WhatsNot'})}>
            <h5 className={'tab-title-w'}>Whats Not</h5>
          </div>
          <div className={`tab-heading-w ${tab.name === 'Bikes' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <Bikes/>, name: 'Bikes'})}>
            <h5 className={'tab-title-w'}>Bikes</h5>
          </div>
          <div className={`tab-heading-w ${tab.name === 'Gear' ? 'activeHeading' : ''} last-tab`}
               onClick={() => switchTab({component: <Gear/>, name: 'Gear'})}>
            <h5 className={'tab-title-w'}>Gear</h5>
          </div>
          <div className="tab-heading-offset"></div>
        </div>
        <div className={`${tab.name === 'Bikes' ? 'inner-tab-content-section-bikes' : 'inner-tab-content-section-w'} background-color-selected`}>
          {tab.component}
        </div>
      </div>
    </>
  )
}

function WhatsIncludedTab(props) {
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

  const showWhatsIncluded = () => {
    if (windowSize > 768) {
      return (
        <div className="flex-row whats-included-section">
          <div className="flex-1">
            <ul>
              <li>Transportation to & from Zürich Airport</li>
              <li>6 Nights of deluxe lodging in Scuol</li>
              <li>Shuttle transportation to riding destinations throughout the week</li>
              <li>Local Swiss guides that know every twist & turn for each adventure</li>
              <li>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and flexible
                attitude, as well as the local connections that our guides have make each and every trip spectacular.</li>
            </ul>
          </div>
          <div className="flex-1">
            <ul>
              <li>Hearty Daily Breakfast – Very Swiss!</li>
              <li>First & last night’s dinner including the famous Werni BBG at the Bike Villa</li>
              <li>Bike rental for week including an e-bike rental on day-6</li>
              <li>Osprey Raptor hydration pack to keep</li>
              <li>Photos – A SmugMug gallery of the week in photos</li>
              <li>Lift tickets at resorts throughout the week as needed</li>
              <li>Day 4 morning rafting trip on one of the most exciting white-water rivers in Europe</li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex-row whats-included-section">
          <div className="flex-1">
            <ul>
              <li>Transportation to & from Zürich Airport</li>
              <li>6 Nights of deluxe lodging in Scuol</li>
              <li>Shuttle transportation to riding destinations throughout the week</li>
              <li>Local Swiss guides that know every twist & turn for each adventure</li>
              <li>Each ride has a minimum of one guide per 7 riders. The service, knowledge, passion, fun and flexible
                attitude, as well as the local connections that our guides have make each and every trip spectacular.</li>
              <li>Hearty Daily Breakfast – Very Swiss!</li>
              <li>First & last night’s dinner including the famous Werni BBG at the Bike Villa</li>
              <li>Bike rental for week including an e-bike rental on day-6</li>
              <li>Osprey Raptor hydration pack to keep</li>
              <li>Photos – A SmugMug gallery of the week in photos</li>
              <li>Lift tickets at resorts throughout the week as needed</li>
              <li>Day 4 morning rafting trip on one of the most exciting white-water rivers in Europe</li>
            </ul>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      {showWhatsIncluded()}
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
            <li>Airfare to Zürich</li>
            <li>Not all meals – We encourage you to explore the local cuisine</li>
            <li>Drinks</li>
            <li>Travel Insurance – required</li>
          </ul>
        </div>
      </div>
    </>
  )
}

function Bikes(props) {
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

  // const {data} = props;
  const showBikes = () => {
    if (windowSize > 768) {
      return (
        <div className="flex-row">
          <div className="bike-section">
            <img className="" src="bike-none.jpeg" alt="non electric mountain bike"/>
            <p>Trek Trail Mountain Bike <a href="https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/trail-mountain-bikes/remedy/remedy-7/p/28509/?colorCode=teal">Remedy 7</a></p>
            <p>Remedy 7 is a mountain bike built for mountain towns. Our best-value Remedy has all the performance features you could want for a ridiculously fun time on the most technical trails. A long travel 160mm RockShox fork, 150mm rear suspension, dropper post, and an 12-speed drivetrain check all the all-mountain boxes.</p>
          </div>
          <div className="bike-section right-section">
            <img className="" src="bike-ele.jpeg" alt="electric mountain bike"/>
            <p>Trek Long Travel E-Bike <a href="https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/trail-mountain-bikes/remedy/remedy-7/p/28509/?colorCode=teal">Powerfly LT 9.7</a></p>
            <p>Powerfly LT 9.7 is an OCLV Mountain Carbon electric mountain bike with long-travel suspension and a high-end parts spec. This high-performance e-MTB is built to take you into the wild unknown to rip up and down whatever mountains you'll find. Plus, Trek's Removable Integrated Battery (RIB) system gives you better balance and protection on the trail, great looks, and exceptional ease of use.</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex-row">
          <div className="bike-section">
            <img className="" src="bike-none.jpeg" alt="non electric mountain bike"/>
            <p>Trek Trail Mountain Bike <a href="https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/trail-mountain-bikes/remedy/remedy-7/p/28509/?colorCode=teal">Remedy 7</a></p>
            <p>Remedy 7 is a mountain bike built for mountain towns. Our best-value Remedy has all the performance features you could want for a ridiculously fun time on the most technical trails. A long travel 160mm RockShox fork, 150mm rear suspension, dropper post, and an 12-speed drivetrain check all the all-mountain boxes.</p>
            <img className="" src="bike-ele.jpeg" alt="electric mountain bike"/>
            <p>Trek Long Travel E-Bike <a href="https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/trail-mountain-bikes/remedy/remedy-7/p/28509/?colorCode=teal">Powerfly LT 9.7</a></p>
            <p>Powerfly LT 9.7 is an OCLV Mountain Carbon electric mountain bike with long-travel suspension and a high-end parts spec. This high-performance e-MTB is built to take you into the wild unknown to rip up and down whatever mountains you'll find. Plus, Trek's Removable Integrated Battery (RIB) system gives you better balance and protection on the trail, great looks, and exceptional ease of use.</p>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      {showBikes()}
    </>
  )
}

function Gear(props) {
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

  // const {data} = props;
  const showGearInfo = () => {
    if (windowSize > 768) {
      return (
        <div className="flex-row whats-included-section">
          <div className="flex-1">
            <h6>Suggested Bike & Gear list</h6>
            <ul>
              <li>Trek Remedy full carbon 150mm travel bike provided for the week. A Trek Superfly E-
                bike will be provided for day 6.</li>
              <li>You’re welcome to ship your own bike to Scuol. Approximate round trip shipping is
                $600. Full assembly and re-packing are included should you decide to ship your own
                bike.</li>
              <li>Pedals (optional) - Shimano pedals will be provided. Bring your own if you have a
                favorite</li>
              <li>Helmet will be provided but it is recommended you bring your own</li>
              <li>Osprey Hydration Pack. A brand-new Osprey hydration pack will be provided</li>
              <li>Bike Cloths including wind &amp; rain protection</li>
              <li>Cool weather gear</li>
              <li>Bike computer</li>
            </ul>
          </div>
          <div className="flex-1 gear-repair-personal">
            <h6>Repair</h6>
            <ul>
              <li>Tubes & pump</li>
              <li>Chain tool</li>
            </ul>
            <h6>Personal</h6>
            <ul>
              <li>Sunscreen</li>
              <li>ID & Passport</li>
              <li>Bathing Shorts</li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex-row whats-included-section">
          <div className="flex-1">
            <h6>Suggested Bike & Gear list</h6>
            <ul>
              <li>Trek Remedy full carbon 150mm travel bike provided for the week. A Trek Superfly E-
                bike will be provided for day 6.</li>
              <li>You’re welcome to ship your own bike to Scuol. Approximate round trip shipping is
                $600. Full assembly and re-packing are included should you decide to ship your own
                bike.</li>
              <li>Pedals (optional) - Shimano pedals will be provided. Bring your own if you have a
                favorite</li>
              <li>Helmet will be provided but it is recommended you bring your own</li>
              <li>Osprey Hydration Pack. A brand-new Osprey hydration pack will be provided</li>
              <li>Bike Cloths including wind &amp; rain protection</li>
              <li>Cool weather gear</li>
              <li>Bike computer</li>
            </ul>
            <h6>Repair</h6>
            <ul>
              <li>Tubes & pump</li>
              <li>Chain tool</li>
            </ul>
            <h6>Personal</h6>
            <ul>
              <li>Sunscreen</li>
              <li>ID & Passport</li>
              <li>Bathing Shorts</li>
            </ul>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      {showGearInfo()}
    </>
  )
}

