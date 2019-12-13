import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './home.css';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";


function Overview() {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <p>Basecamp for the week will be in Scuol, Switzerland, a small village nestled in the Alps in the far
            eastern portion of Switzerland near the borders of Austria and Italy. Scuol is surrounded by
            rippling peaks and dense forests, and is ideal for remote mountain biking and crowd-free enjoyment.
            It's a joy to stroll the Old Town (Lower Scuol), an attractive jumble of chalets, cobbled squares,
            and fountains that spout mineral water tapped from one of 20 springs in the region.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            The extensive and well organized infrastructure of Switzerland allows for easy access to what would
            otherwise be remote wilderness. Mountain bikes are the best means to explore and enjoy the countless
            trails that evolved over hundreds of years of Western European development.
            Screen reader support enabled.
          </p></div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>While in the Alps near the Swiss border, the trip will include beautiful glacier views at
            spectacular St Moritz, a day in Davos, the highest city in Europe and full day at in dynamic town of
            Livigno, Italy. After a day of pedaling, treat yourself at one of the oldest spa complexes of
            Europe. Relish the valley views from the purifying hot mineral water of Medieval bath-house
            architecture. </p>
          <p>IS THIS RIDE FOR YOU?</p>
          <p> This Ride is for you if you are an Experienced Level Rider, with the fitness to conquer some big
            days of pedaling multiple days in a row. Riding trails with exposure does not bother you. You enjoy
            all-mountain style riding, and have the skills to play. Climbing is limited on this trip, but when
            we do, it’s a steep one! You are super comfortable on your bike and are not scared to let go of the
            brakes or roll down 2 foot drops. You love to ride singletrack and you're up for adventure with a
            gorgeous lodge to come home to after an epic ride, and a chilled beer. You wouldn't pass the
            opportunity for a shuttle or lift up for an epic descent.
          </p>
        </div>
      </div>
    </div>
  )
}

function Itinerary() {
  return (
    <div className="col-12 ">
      <div className="row">
        <div className="col-12">
          <ul>
            <li>Day 1: Arrive in Zurich</li>

            <p>Welcome to Switzerland!</p>

            <p>You will be met at the Zürich Airport and begin the week there. We take a 2.5 hour train through
              the Swiss countryside then begin the accent into the spectacular place called the Alps.</p>

            <p>Once we arrive in Scuol and get settled we’ll grab our bikes and go for a warm-up ride. The day
              will end with some local cuisine at one of the best restaurant’s in Scuol.</p>

            <li>Day 2: St Mortiz – The Vail of Europe</li>

            <p>We load into the vans and head to St Moritz for a spectacular day of riding. As the world’s
              number one Alpine holiday destination, it is not surprising that the Winter Olympic Games were
              held not once, but twice here in the heart of the fascinating Upper Engadin lake district.</p>

            <li>Day 3: Davos – Highest point in Europe</li>

            <p>Davos is on the agenda for day 3. We’ll use some of the high-tech train and lift systems that
              characterize the Swiss public transport. The Swiss transport system gives us easy access to
              impressive alpine terrain and the best of the extensive Davos trail network.</p>

            <li>Day 4: River rafting adventure</li>

            <p>This is a trip that everyone will enjoy! The Scuol gorge is a 9-kilometre run that starts 5 km
              above the village and finishes at Pradella a few kilometers below Scuol. It has some great white
              water at the beginning, Frenchman’s the challenging first rapid is only a matter of meters away
              from the put-in and is a great start to the trip. Scuol was one of the most famous mineral spas in
              Europe during the 19th century and we raft past some of the grand hotels and mineral spring halls
              on our way down the river. Towards the end of the trip there is another series of challenging
              rapids such as ‘galaxy and jack the ripper’ before we enter the lake at Pradella where we
              take-out. When you return from the river there is cold beer, a warm shower and your photos waiting
              for you</p>

            <li>Day 5: Livigno Italy – Flow country</li>


            <p>We pack up to make the 1.5 hour drive to Livigno, Italy. The Italian resort of Livigno is set in
              a
              high, wide, remote valley close to the Swiss border. Most of the slopes are above the tree line,
              and
              Livigno is known as ‘Little Tibet’ because of its height and remoteness.</p>

            <p>With a few days of European trails under our belt, we’ll step it up today and session some more
              challenging single-track of the region. Livigno aka “Flow Country” is loaded with ridiculously-fun
              trails.</p>

            <p>Now you'll understand why Hans Rey made this valley his home town for many many years.</p>

            <li>Day 6: E-bike Day - Tour de Scuol</li>

            <p>We will spend the day exploring the beautiful Engiadina valley on ebikes. Nothing like climbing
              4k
              feet in the high altitude and not breaking a sweat while taking in spectacular views.</p>

            <p>The day and the week will end at the Bike Villa for the world famous Werni BBQ hosted the by
              amazing
              folks on the ground in Scuol that make all this happen.</p>


            <li>Day 7: Party’s Over</li>

            <p> We will head out early to get back to Zürich. Plan accordingly.</p>

            <p>If you would like to extend your European holiday there is no better place to start than from
              Zurich. By far, the best way to see Europe is from the train.</p>

            <p>Travel times from Zurich by train:</p>

            <p>Milan – 4 Hours</p>
            <p>London – 7 Hours</p>
            <p>Paris – 4 Hours</p>
            <p>Munich – 4 hours</p>
          </ul>
        </div>
      </div>
    </div>
  )
}

function WhatsIncluded() {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12">
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
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [homepageData, setHomepageData] = useState({
    mainHeader: 'Default Main Heading',
    subHeader: 'Default Sub Heading',
    mainDescription: 'Default main description'
  });
  const [bannerImage, setBannerImage] = useState({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg)'});
  const [tab, setTab] = useState(<Overview/>);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

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
        <div>
          <div className="col-12 col-sm-4 tab-heading tab-heading-hover" onClick={() => switchTab(<Overview/>)}>
            <h2>Overview</h2>
          </div>
          <div className="col-12 col-sm-4 tab-heading tab-heading-hover" onClick={() => switchTab(<Itinerary/>)}>
            <h2>Itinerary</h2>
          </div>
          <div className="col-12 col-sm-4 tab-heading tab-heading-hover" onClick={() => switchTab(<WhatsIncluded/>)}>
            <h2>Whats Included</h2>
          </div>
          <div>{tab}</div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="col-12 col-sm-4 tab-heading">
            <h2>Overview</h2>
            <Overview/>
          </div>
          <div className="col-12 col-sm-4 tab-heading">
            <h2>Itinerary</h2>
            <Itinerary/>
          </div>
          <div className="col-12 col-sm-4 tab-heading">
            <h2>Whats Included</h2>
            <WhatsIncluded/>
          </div>
        </div>
      )
    }
  };


  return (
    <div>
      <main className="">
        <section className="hero-section" style={bannerImage}>

        </section>

        <section className="trip-info-section container">
          <div className="row">
            {displayTabSelectors()}
          </div>
        </section>

        <section className="hero-section">

        </section>
      </main>
    </div>

  );
}

export default Home;
