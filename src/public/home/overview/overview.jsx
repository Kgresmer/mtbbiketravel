import {useEffect, useState} from "react";
import React from "react";

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

  useEffect(() => {
    document.title = "MTN Bike Travel, Cycling Adventure in Switzerland"
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
        <iframe alt="scuol mountain bike adventure map" src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="640" height="640"></iframe>
      </div>}
      {(windowSize >= 1100 && windowSize < 1350) && <div className="tab-image-section" >
        <iframe alt="scuol mountain bike adventure map" src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="710" height="640"></iframe>
      </div>}
      {windowSize > 1350 && <div className="tab-image-section" >
        <iframe alt="scuol mountain bike adventure map" src="https://www.google.com/maps/d/u/0/embed?mid=1EBDe6rQcV2XIIm4MC_GQbQW-SEUk37Jq" width="840" height="640"></iframe>
      </div>}
    </>
  )
}

export default Overview;