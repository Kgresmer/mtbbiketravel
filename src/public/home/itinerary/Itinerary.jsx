import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './itinerary.css';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: 'black',
  },
  secondaryHeading: {
    fontSize: '1.0em',
    color: 'black'
  },
  active: {
    color: 'black'
  },
  icon: {
    color: 'black'
  },
  panel: {
    border: '1px solid #bfbfbf',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#E9E9E9'
    }
  },
  activePanel: {
    border: '1px solid #bfbfbf',
    backgroundColor: 'white',
  },
  lastPanel: {

  }

}));

const itineraryData = [
  {
    day: 1,
    title: 'Arrive in Zurich',
    body: 'Welcome to Switzerland! You will be met at the Zürich Airport and begin the week there. We take a 2.5 hour train through\n' +
      'the Swiss countryside then begin the ascent into the spectacular place called the Alps.\n' +
      'Once we arrive in Scuol and get settled we’ll grab our bikes and go for a warm-up ride. The day\n' +
      'will end with some local cuisine at one of the best restaurant’s in Scuol.'
  },
  {
    day: 2,
    title: 'St Moritz – The Vail of Europe',
    body: 'We load into the vans and head to St Moritz for a spectacular day of riding. As the world’s\n' +
      'number one Alpine holiday destination, it is not surprising that the Winter Olympic Games were\n' +
      'held not once, but twice here in the heart of the fascinating Upper Engadin lake district.'
  },
  {
    day: 3,
    title: 'Davos – Highest point in Europe',
    body: `Davos is on the agenda for day 3. We’ll use some of the high-tech train and lift systems that
characterize the Swiss public transport. The Swiss transport system gives us easy access to
impressive alpine terrain and the best of the extensive Davos trail network.`
  },
  {
    day: 4,
    title: 'River rafting adventure',
    body: `This is a trip that everyone will enjoy! The Scuol gorge is a 9-kilometre run that starts 5 km
above the village and finishes at Pradella a few kilometers below Scuol. It has some great white
water at the beginning, Frenchman’s the challenging first rapid is only a matter of meters away
from the put-in and is a great start to the trip. Scuol was one of the most famous mineral spas in
Europe during the 19th century and we raft past some of the grand hotels and mineral spring halls
on our way down the river. Towards the end of the trip there is another series of challenging
rapids such as ‘galaxy and jack the ripper’ before we enter the lake at Pradella where we
take-out. When you return from the river there is cold beer, a warm shower and your photos waiting
for you`
  },
  {
    day: 5,
    title: 'Livigno Italy – Flow country',
    body: `We pack up to make the 1.5 hour drive to Livigno, Italy. The Italian resort of Livigno is set in a
    high, wide, remote valley close to the Swiss border. Most of the slopes are above the tree line, and
    Livigno is known as ‘Little Tibet’ because of its height and remoteness. With a few days of European trails under our belt, we’ll step it up today and session some more
    challenging single-track of the region. Livigno aka “Flow Country” is loaded with ridiculously-fun
    trails. Now you'll understand why Hans Rey made this valley his home town for many many years.`
  },
  {
    day: 6,
    title: 'E-bike Day - Tour de Scuol',
    body: `We will spend the day exploring the beautiful Engiadina valley on ebikes. Nothing like climbing 4k
  feet in the high altitude and not breaking a sweat while taking in spectacular views.
  The day and the week will end at the Bike Villa for the world famous Werni BBQ hosted the by amazing
  folks on the ground in Scuol that make all this happen.`
  },
  {
    day: 7,
    title: 'Party’s Over',
    body: `We will head out early to get back to Zürich. Plan accordingly.

If you would like to extend your European holiday there is no better place to start than from
  Zurich. By far, the best way to see Europe is from the train.

Travel times from Zurich by train:`
  }
];

function DayDisplay(props) {
  const {data} = props;

  return (
    <>
      <div className="flex-column-it">
        <div className="main-body">{data.body}
          {data.day === 7 && <ul>
            <li>Milan – 4 Hours</li>
            <li>London – 7 Hours</li>
            <li>Paris – 4 Hours</li>
            <li>Munich – 4 hours</li>
          </ul>}
        </div>

        {data.day !== 7 && <div className="flex-row center stats">
          <div className="stat-column center">
            <div className="">
              <AirportShuttleIcon/>
            </div>
            <div className="center-text">
              Distance from Scuol:<br></br>
              <p>65 kilometers</p>
            </div>
          </div>
          <div className="stat-column center">
            <div className="">
              <FilterHdrIcon/>
            </div>
            <div className="center-text">
              Elevation at base:<br></br>
              <p>1344 meters</p>
            </div>
          </div>
          <div className="stat-column center">
            <div className="">
              <AccessTimeIcon/>
            </div>
            <div className="center-text">
              Ride Duration:<br></br>
              <p>~3 hours 30 minutes</p>
            </div>
          </div>
        </div>}
      </div>
    </>
  )
}

export default function Itinerary() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [tabImage, setTabImage] = useState({backgroundImage: `url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel1-wide.jpg)`});
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const updateTabImage = (panelNumber) => {
    if (window.innerWidth > 1100) {
      setTabImage({backgroundImage: `url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel${panelNumber}-wide.jpg)`});
      console.log('going wide')
    } else {
      setTabImage({backgroundImage: `url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel${panelNumber}.jpg)`});
      console.log('going narrow')
    }
  };

  useEffect(() => {
    setExpanded('panel1');
    updateTabImage(1);
    if (!typeof window === 'object') {
      return false;
    }

    function handleResize() {
      setWindowSize(window.innerWidth);
      const panelNumber = tabImage.backgroundImage.split('panel')[1].substr(0, 1);
      updateTabImage(panelNumber)
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    switch (panel) {
      case 'panel1': {
        updateTabImage(1);
        break;
      }
      case 'panel2': {
        updateTabImage(2);
        break;
      }
      case 'panel3': {
        updateTabImage(3);
        break;
      }
      case 'panel4': {
        updateTabImage(4);
        break;
      }
      case 'panel5': {
        updateTabImage(5);
        break;
      }
      case 'panel6': {
        updateTabImage(6);
        break;
      }
      case 'panel7': {
        updateTabImage(7);
        break;
      }
    }
  };

  const expansionItems = itineraryData.map((data, index) => {
      const isActive = expanded === `panel${data.day}`;
      const active = isActive ? classes.active : '';

      return (
        <div key={index}>
          <ExpansionPanel className={`${isActive ? classes.activePanel : classes.panel} ${index === 6 ? classes.lastPanel : ''}`} expanded={isActive} onChange={handleChange(`panel${data.day}`)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon className={classes.icon}/>}
              aria-controls={`panel${data.day}bh-content`}
              id={`panel${data.day}bh-header`}
            >
              <Typography className={`${classes.heading} ${active}`}>{`Day: ${data.day}`}</Typography>
              <Typography className={`${classes.secondaryHeading} ${active}`}>{data.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <DayDisplay data={data}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )
    }
  );

  return (
    <>
      <div className={`tab-text-section ${windowSize > 768 ? 'tab-text-it-section-large' : ''}`}>
        <div className={classes.root}>
          {expansionItems}
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
  );
};

