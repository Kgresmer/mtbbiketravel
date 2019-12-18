import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const itineraryData = [
  {
    day: 1,
    title: 'Arrive in Zurich',
    body: 'Welcome to Switzerland! You will be met at the Zürich Airport and begin the week there. We take a 2.5 hour train through\n' +
      'the Swiss countryside then begin the accent into the spectacular place called the Alps.\n' +
      'Once we arrive in Scuol and get settled we’ll grab our bikes and go for a warm-up ride. The day\n' +
      'will end with some local cuisine at one of the best restaurant’s in Scuol.'
  },
  {
    day: 2,
    title: 'St Mortiz – The Vail of Europe',
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

Travel times from Zurich by train:

Milan – 4 Hours
London – 7 Hours
Paris – 4 Hours
Munich – 4 hours`
  }
]

export default function Itinerary() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [tabImage, setTabImage] = useState({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel1.jpg)'});
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

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    switch (panel) {
      case 'panel1': {
        setTabImage({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel1.jpg)'});
        break;
      }
      case 'panel2': {
        setTabImage({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel2.jpg)'});
        break;
      }
      case 'panel3': {
        setTabImage({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel3.jpg)'});
        break;
      }
      case 'panel4': {
        setTabImage({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel4.jpg)'});
        break;
      }
      case 'panel5': {
        setTabImage({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel5.jpg)'});
        break;
      }
      case 'panel6': {
        setTabImage({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel6.jpg)'});
        break;
      }
      case 'panel7': {
        setTabImage({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/panel7.jpg)'});
        break;
      }
    }
  };

  const expansionItems = itineraryData.map((data, index) => {
      return (
        <div key={index}>
          <ExpansionPanel expanded={expanded === `panel${data.day}`} onChange={handleChange(`panel${data.day}`)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls={`panel${data.day}bh-content`}
              id={`panel${data.day}bh-header`}
            >
              <Typography className={classes.heading}>{`Day: ${data.day}`}</Typography>
              <Typography className={classes.secondaryHeading}>{data.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {data.body}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )
    }
  );

  return (
    <>
      <div className={`tab-text-section ${windowSize > 768 ? 'tab-text-section-large' : ''}`}>
        <div className={classes.root}>
          {expansionItems}
        </div>
      </div>
      {windowSize > 768 && <div className="tab-image-section" style={tabImage}></div>}
    </>
  );
};

