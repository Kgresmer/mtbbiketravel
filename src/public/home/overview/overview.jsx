import {useEffect, useState} from "react";
import React from "react";
import {useLocation} from "react-router-dom";
import './overview.css';


function Overview() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [tab, setTab] = useState(windowSize > 700 ? {component: <OverviewDetail/>, name: 'OverviewDetail'} : {
    component: <OurTeam/>, name: 'OurTeam'
  });
  const {hash} = useLocation();


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

  useEffect(() => {
    document.title = "MTN Bike Travel, Cycling Adventure in Switzerland"
  }, []);


  const switchTab = (selectedTab) => {
    setTab(selectedTab);
  };

  useEffect(() => {
    const tabElements = document.getElementById('Overview');
    if (tabElements) {
      const y = tabElements.scrollHeight - 25;

      if (hash === '#Overview-OverviewDetail') {
        switchTab({component: <OverviewDetail/>, name: 'OverviewDetail'});
        window.scrollTo(0, y)
      } else if (hash === '#Overview-OurTeam') {
        switchTab({component: <OurTeam/>, name: 'OurTeam'});
        window.scrollTo(0, y)
      } else if (hash === '#Overview-FAQ') {
        switchTab({component: <FAQ/>, name: 'FAQ'});
        window.scrollTo(0, y)
      }
    }
    document.title = "Big Picture, Our Team, FAQ"
  }, [hash]);

  return (
    <>
      <div className="tab-section-w">
        <div className="flex-column overview-banner" style={{height: 'auto'}}>
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
        <div className="flex-row">
          <div className="tab-heading-offset"></div>
          {windowSize > 700 ? <div className={`tab-heading-w ${tab.name === 'OverviewDetail' ? 'activeHeading' : ''}`}
                                   onClick={() => switchTab({component: <OverviewDetail/>, name: 'OverviewDetail'})}>
              <h5 className={'tab-title-w'}><span className={'wi-title'}>Big Picture</span></h5>
            </div> :
            <div className="tab-heading-offset"></div>}
          <div className={`tab-heading-w ${tab.name === 'OurTeam' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <OurTeam/>, name: 'OurTeam'})}>
            <h5 className={'tab-title-w'}><span className={'wi-title'}>Our Guides</span></h5>
          </div>
          <div className={`tab-heading-w ${tab.name === 'FAQ' ? 'activeHeading' : ''} last-tab`}
               onClick={() => switchTab({component: <FAQ/>, name: 'FAQ'})}>
            <h5 className={'tab-title-w'}><span className={'wi-title'}>FAQ’s</span></h5>
          </div>
          <div className="tab-heading-offset"></div>
          <div className="tab-heading-offset"></div>
        </div>
        {tab.component}
      </div>
    </>
  )
}

function OverviewDetail() {
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
    <div className='inner-tab-content-section-w background-color-selected'>
      <div className="flex-row center">
        {(windowSize > 768 && windowSize < 1099) && <div className="tab-image-section">
          <iframe alt="scuol mountain bike adventure map"
                  src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="840"
                  height="640"></iframe>
        </div>}
        {(windowSize >= 1100 && windowSize < 1350) && <div className="tab-image-section">
          <iframe alt="scuol mountain bike adventure map"
                  src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="1040"
                  height="740"></iframe>
        </div>}
        {windowSize > 1350 && <div className="tab-image-section">
          <iframe alt="scuol mountain bike adventure map"
                  src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="1340"
                  height="840"></iframe>
        </div>}
      </div>
    </div>
  );
}

function OurTeam() {
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
    <div className="flex-column inner-tab-content-section-o">
      <p>All three members of the team in Switzerland are full time residents in Scuol.
        They love and live the Mountain lifestyle year-round. Their knowledge and experience
        of the area is second to none and truly enjoy sharing the Swiss Alp lifestyle.</p>
      <div className={windowSize < 700 ? 'flex-column' : 'flex-row'}>
        <div className="flex-column guide-section">
          <img className='guide-img' src='https://mtbbiketravel.s3.us-east-2.amazonaws.com/werni.jpg'
               alt="image of guide werni"/>
          <p className='guide-name'>Werni Dirren</p>
          <p>Werni loves and lives biking. His lifeblood is trail surfing and nature in its full perspective –
            a philosopher on two wheels. He knows the art of hosting, so guests feel comfortable. The ambiance
            in his Villa is one of a kind and for many the highlight of their tour. In the winter, Werni manages
            the Alpetta Mountain Restaurant in the ski area of Scuol.
          </p>
        </div>
        <div className='flex-column guide-section'>
          <img className='guide-img' src='https://mtbbiketravel.s3.us-east-2.amazonaws.com/george.jpg'
               alt="image of guide george"/>
          <p className='guide-name'>George Hein</p>
          <p>George’s fine nose for the perfect trail is seen in our offer range. Because he simply has fun riding,
            he really spices up our tours. The globe trotter is a guarantee for memories of his journeys. He manages
            the Bike Shop in Scuol full time in the summer.
          </p>
        </div>
        <div className="flex-column guide-section">
          <img className='guide-img' src='https://mtbbiketravel.s3.us-east-2.amazonaws.com/xaver.jpg'
               alt="image of guide xaver"/>
          <p className='guide-name'>Xaver Frieser</p>
          <p>Xaver is active in the qualification for MTB-Guides and manages different camps.
            Because of his established know-how and selected methods, his tips and tricks are
            really pushing forward. Quiet a few could benefit from his guiding and experience
            in the sport.
          </p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {

  return (
    <div className="flex-column inner-tab-content-section-o">
      <ul>
        <li>How fit do I need to be for the trip?
          <ul className='inner-list'>
            <li>
              Our trips are designed for the intermediate to advanced mountain biker. Typically, that means you can
              expect to spend 4 to 6 hours a day in the saddle with some climbing. All of the locations we will be
              riding have lift access so climbing is at a minimum.
            </li>
          </ul>
        </li>
        <li>
          How technical are the trails?
          <ul className='inner-list'>
            <li>
              Very. Depending on the location, there are sections many riders will walk. If you are new to mountain
              biking this trip may not be for you.
            </li>
          </ul>
        </li>
        <li>
          How do the guides deal with different skill levels?
          <ul className='inner-list'>
            <li>
              Our guides will consider each riders skill level and expectations to determine the best breakouts each
              day.
            </li>
          </ul>
        </li>
        <li>
          Is Altitude an issue?
          <ul className='inner-list'>
            <li>
              Our base camp for the week is Scuol, Switzerland where elevation is 4300ft. Our daily rides will get up to
              10,000 feet. Altitude effects everyone differently.
            </li>
          </ul>
        </li>
        <li>
          How does weather effect the trip?
          <ul className='inner-list'>
            <li>
              Our trips are planned for the warmest months in the region but that does not guarantee great weather. We
              will cancel rides only if dangerous weather is forecasted. We strongly recommend you bring warm cloths and
              rain gear.
            </li>
          </ul>
        </li>
        <li>
          Trek e-bikes are included in the price but can I bring my own bike?
          <ul className='inner-list'>
            <li>
              Yes! We can arrange to ship your bike at additional cost. Our professional staff will build it and have it
              ready to ride when you arrive. The additional cost also includes packing it up and shipping it home.
            </li>
          </ul>
        </li>
        <li>
          Can I bring my spouse/partner?
          <ul className='inner-list'>
            <li>
              Yes, we encourage this. As long as they understand there will be 3 days during the week they will be on
              their own for most of the day and night. The surrounding area has lots to offer
            </li>
          </ul>
          <ul>
            <li>
              Visit St. Moritz – It’s about a 90-minute trip to St Moritz via train. Often referred to as the Vail of
              Europe, St Moritz is a magnificent experience.
            </li>
            <li>
              Visit the Swiss National Park. The main entrance and visitor center are a 30-minute drive from Scuol. This is
              the only National Park in Switzerland.
            </li>
            <li style={{marginBottom: '1%'}}>
              Explore the Motta Naluns local mountain resort just a quick walk from the hotel. The lifts are open all
              summer long and offer terrific hiking trails with spectacular views. The new mountain scooter rentals are
              great way to get the best views of the Engadine Valley.
              How about a day of white-water rafting? The Inn River runs through the Swiss National Park in Scuol. A
              grade III-IV river renowned as the best white-water run in Europe. The rafting trip is on the itinerary
              for Wednesday during the week and everyone is welcome.
            </li>
          </ul>
        </li>
        <li>
          What kind of accommodations are included?
          <ul className='inner-list'>
            <li>
              Two options for lodging. The Bike Villa is a charming 400-year-old home conveniently located in the heart
              of Scuol. It has three separate apartments with private bedrooms, private baths and full kitchen in each.
              Your host, Werni will serve you a very Swiss breakfast every morning. The other option is Hotel Curuna
              located just a couple blocks from the Bike Villa. It’s cozy place and serves a great breakfast spread
              every morning.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Overview;