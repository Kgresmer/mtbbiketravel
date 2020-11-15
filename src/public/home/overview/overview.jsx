import {useEffect, useState} from "react";
import React from "react";
import {useLocation} from "react-router-dom";
import './overview.css';


function Overview() {
  const [tab, setTab] = useState({component: <OverviewDetail/>, name: 'OverviewDetail'});
  const { hash } = useLocation();

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

      if (hash === '#overview-detail') {
        switchTab({component: <Overview/>, name: 'Overview'});
        window.scrollTo(0, y)
      } else if (hash === '#our-team') {
        switchTab({component: <OurTeam/>, name: 'OurTeam'});
        window.scrollTo(0, y)
      } else if (hash === '#faq') {
        switchTab({component: <FAQ/>, name: 'FAQ'});
        window.scrollTo(0, y)
      }
    }
    document.title = "Big Picture, Our Team, FAQ"
  }, [hash]);

  return (
    <>
      <div className="tab-section-w">
        <div className="flex-row">
          <div className="tab-heading-offset"></div>
          <div className={`tab-heading-w ${tab.name === 'OverviewDetail' ? 'activeHeading' : ''}`}
               onClick={() => switchTab({component: <OverviewDetail/>, name: 'OverviewDetail'})}>
            <h5 className={'tab-title-w'}><span className={'wi-title'}>Big Picture</span></h5>
          </div>
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
      <div className="flex-row">
        <div className={`tab-text-section ${windowSize > 768 ? 'tab-text-section-large' : ''}`}>
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

        {(windowSize > 768 && windowSize < 1099) && <div className="tab-image-section" >
          <iframe alt="scuol mountain bike adventure map" src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="640" height="640"></iframe>
        </div>}
        {(windowSize >= 1100 && windowSize < 1350) && <div className="tab-image-section" >
          <iframe alt="scuol mountain bike adventure map" src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="710" height="640"></iframe>
        </div>}
        {windowSize > 1350 && <div className="tab-image-section" >
          <iframe alt="scuol mountain bike adventure map" src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="840" height="640"></iframe>
        </div>}
      </div>
    </div>
  );
}

function OurTeam() {

  return (
    <div className="flex-column inner-tab-content-section-o">
        <p>All three members of the team in Switzerland are full time residents in Scuol.
          They love and live the Mountain lifestyle year-round. Their knowledge and experience
          of the area is second to none and truly enjoy sharing the Swiss Alp lifestyle.</p>
      <div className="flex-row">
        <div className="flex-column guide-section">
          <img className='guide-img' src='https://mtbbiketravel.s3.us-east-2.amazonaws.com/werni.jpg'  alt="image of guide werni"/>
          <p className='guide-name'>Werni Dirren</p>
          <p>Werni loves and lives biking. His lifeblood is trail surfing and nature in its full perspective –
            a philosopher on two wheels. He knows the art of hosting, so guests feel comfortable. The ambiance
            in his Villa is one of a kind and for many the highlight of their tour. In the winter, Werni manages
            the Alpetta Mountain Restaurant in the ski area of Scuol.</p>
        </div>
        <div className="flex-column guide-section">
          <img className='guide-img' src='https://mtbbiketravel.s3.us-east-2.amazonaws.com/george.jpg'  alt="image of guide george"/>
          <p className='guide-name'>George Hein</p>
          <p>George’s fine nose for the perfect trail is seen in our offer range. Because he simply has fun riding,
            he really spices up our tours. The globe trotter is a guarantee for memories of his journeys. He manages
            the Bike Shop in Scuol full time in the summer.
          </p>
        </div>
        <div className="flex-column guide-section">
          <img className='guide-img' src='https://mtbbiketravel.s3.us-east-2.amazonaws.com/xaver.jpg'  alt="image of guide xaver"/>
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
      <p>Thing 1</p>
    </div>
  )
}

export default Overview;