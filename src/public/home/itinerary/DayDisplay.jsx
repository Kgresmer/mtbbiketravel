import {useRef, useState} from "react";
import React from "react";
import './itinerary.css';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from "@material-ui/icons/Close";


function SkillLevelModal(props) {

  return (
    <div className="skill-level-modal">
      <h5>Skill Level 6: INTERMEDIATE ADVANCED </h5>
      <ul>
        <li>You’re confident in your climbing and descending skills.</li>
        <li>You can handle moderately technical terrain and obstacles such as small logs and rocks (up to 6 inches
          high).
        </li>
        <li>You have very good control of your bike on intermediate and slightly more advanced terrain, and are
          comfortable climbing quite technical single-track.
        </li>
      </ul>
      <hr></hr>
      <p onClick={props.showSkillsAndFitnessModal} className="more-info">Click here to view more information on skill and fitness levels. </p>
    </div>
  )
}

function FitnessLevelModal(props) {

  return (
    <div className="skill-level-modal">
      <h5>Level 5 </h5>
      <ul>
        <li>You’re capable of riding 4 hours a day at a moderate pace with some short breaks, over a few days</li>
        <li>You’re confident climbing up to a total of 1500ft vertical in a day</li>
        <li>You exercise on average 3-4 hours per week (including riding your bike)</li>
      </ul>
      <hr></hr>
      <p onClick={props.showSkillsAndFitnessModal} className="more-info">Click here to view more information on skill and fitness levels. </p>
    </div>
  )
}

export default function DayDisplay(props) {
  const {data} = props;
  const skillIcon = useRef();
  const fitnessIcon = useRef();
  const skillDisplay = useRef();
  const fitnessDisplay = useRef();
  const [showModal, setShowModal] = useState(false);

  const displaySkills = (day) => {
    if (skillDisplay.current && skillDisplay.current.style && skillDisplay.current.style.display !== 'block') {
      skillDisplay.current.style.display = "block";
      const skillIcon = document.getElementById(`skill-icon-${day}`);
      if (skillIcon) {
        skillDisplay.current.style.left = skillIcon.getBoundingClientRect().x + 30 + 'px';
        skillDisplay.current.style.top = skillIcon.getBoundingClientRect().y - 150 + 'px';
      }
      let pos = 0;

      function frame() {
        if (pos == 99) {
          clearInterval(id);
        } else {
          pos++;
          skillDisplay.current.style.opacity = pos + '%';
        }
      }

      var id = setInterval(frame, 4);
    }
  };

  const removeSkills = () => {
    if (skillDisplay.current && skillDisplay.current.style && skillDisplay.current.style.display === 'block') {
      let pos = 99;

      function frame() {
        if (pos == 0) {
          console.log('setting to none')
          skillDisplay.current.style.display = "none";
          clearInterval(id);
        } else {
          pos--;
          skillDisplay.current.style.opacity = pos + '%';
        }
      }

      var id = setInterval(frame, 4);
    }
  };

  const displayFitness = (day) => {
    if (fitnessDisplay.current && fitnessDisplay.current.style && fitnessDisplay.current.style.display !== 'block') {
      fitnessDisplay.current.style.display = "block";
      const fitnessIcon = document.getElementById(`fitness-icon-${day}`);
      if (fitnessIcon) {
        fitnessDisplay.current.style.left = fitnessIcon.getBoundingClientRect().x + 30 + 'px';
        fitnessDisplay.current.style.top = fitnessIcon.getBoundingClientRect().y - 150 + 'px';
      }
      let pos = 0;

      function frame() {
        if (pos == 99) {
          clearInterval(id);
        } else {
          pos++;
          fitnessDisplay.current.style.opacity = pos + '%';
        }
      }

      var id = setInterval(frame, 4);
    }
  };

  const removeFitness = () => {
    if (fitnessDisplay.current && fitnessDisplay.current.style && fitnessDisplay.current.style.display === 'block') {
      let pos = 99;

      function frame() {
        if (pos == 0) {
          console.log('setting to none')
          fitnessDisplay.current.style.display = "none";
          clearInterval(id);
        } else {
          pos--;
          fitnessDisplay.current.style.opacity = pos + '%';
        }
      }

      var id = setInterval(frame, 4);
    }
  };

  const showSkillsAndFitnessModal = () => {
    setShowModal(true);
  };

  const clearModal = () => {
    setShowModal(false);
  };

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

        {data.showStats && <div className="flex-row center stats">
          <div className="stat-column">
            <div className="">
              <DirectionsBikeIcon/>
            </div>
            <div className="center-text" onMouseLeave={removeSkills}>
              Skill Level:<br></br>
              <p className="stat-text" onClick={showSkillsAndFitnessModal}>INTERMEDIATE ADVANCED </p>
              <p className="stat-level">6/9 <InfoIcon ref={skillIcon} id={`skill-icon-${data.day}`}
                                                      onMouseOver={() => displaySkills(data.day)}
                                                      fontSize="small"
                                                      color="primary"/>
              </p>
              <div className="skill-hover-modal" ref={skillDisplay}><SkillLevelModal showSkillsAndFitnessModal={showSkillsAndFitnessModal}/>
              </div>
            </div>
          </div>
          <div className="stat-column">
            <div className="">
              <DirectionsRunIcon/>
            </div>
            <div className="center-text" onMouseLeave={removeFitness}>
              Fitness Level:<br></br>
              <p className="stat-level">5/9 <InfoIcon ref={fitnessIcon}
                                                      id={`fitness-icon-${data.day}`}
                                                      onMouseOver={() => displayFitness(data.day)}
                                                      fontSize="small" color="primary"/></p>
              <div className="skill-hover-modal" ref={fitnessDisplay}><FitnessLevelModal showSkillsAndFitnessModal={showSkillsAndFitnessModal}/>
              </div>
            </div>
          </div>
          <div className="stat-column">
            <div className="">
              <AccessTimeIcon/>
            </div>
            <div className="center-text">
              Ride Duration:<br></br>
              <p className="stat-level">{data.rideDur}</p>
            </div>
          </div>
        </div>}
      </div>
      <div className={`modal ${showModal ? 'show' : 'dontShow'} skills-modal`}>
        <div className="skills-fitness-modal">
          <button className="close-skills-modal"><CloseIcon fontSize="large" onClick={() => clearModal()}/></button>
          <h3>Skill Levels</h3>
          <h5>Level 1: NEWBIE </h5>
          <ul>
            <li>You’ve never ridden a mountain bike before</li>
          </ul>
          <h5>Level 2: BEGINNER </h5>
          <ul>
            <li>You have limited experience with off-road trail riding</li>
            <li>You may have done some road riding</li>
            <li>You’re reasonably fit and adventurous</li>
          </ul>
          <h5>Level 3: STRONG BEGINNER </h5>
          <ul>
            <li>You’re hooked but still lack the skills to tackle terrain beyond beginner level</li>
            <li>You know how to use your gears and brakes properly but when the terrain gets technical, you have to get off your bike and walk
            </li>
            <li>You can handle single-track as long as it is smooth and with few rocks or roots
            </li>
          </ul>
          <h5>Level 4: INTERMEDIATE </h5>
          <ul>
            <li>You have good general trail riding skills</li>
            <li>You’re capable of controlling bike speed and direction on moderate single-track
            </li>
            <li>You ride your bike once or twice a week during cycling season
            </li>
          </ul>
          <h5>Level 5: STRONG INTERMEDIATE </h5>
          <ul>
            <li>You feel confident on intermediate-level trails</li>
            <li>You can handle undulating terrain, have good control of your brakes and know how to shift gears appropriately so that you don’t get off your bike too often
            </li>
            <li>You can handle terrain that is slightly technical, with smaller rocks and roots and can climb on single-track as long as it’s not very technical
            </li>
          </ul>
          <h5>Level 6: INTERMEDIATE ADVANCED </h5>
          <ul>
            <li>You’re confident in your climbing and descending skills.</li>
            <li>You can handle moderately technical terrain and obstacles such as small logs and rocks (up to 6 inches
              high).
            </li>
            <li>You have very good control of your bike on intermediate and slightly more advanced terrain, and are
              comfortable climbing quite technical single-track.
            </li>
          </ul>
          <h5>Level 7: ADVANCED </h5>
          <ul>
            <li>You are confident in all aspects of mountain biking</li>
            <li>You can handle most technical terrain, include rocky and root trails, along with features such as switchbacks, medium logs (10 inches), and low-level obstacles
            </li>
            <li>You’re comfortable with most advanced level trails (although you may walk a few sections)
            </li>
          </ul>
          <h5>Level 8: EXPERT </h5>
          <ul>
            <li>You’re fully confident riding all types of terrain and distances</li>
            <li>You ride as often as possible and can handle technical terrain and medium-level stunts, such as large log rollovers 20 inches and small bridges
            </li>
            <li>You can descend steeps and climb technical single-track with little to no problem</li>
            <li>You rarely – if ever – get off your bike to walk sections except on extremely technical terrain</li>
          </ul>
          <h5>Level 9: PRO </h5>
          <ul>
            <li>You are a mountain bike god/goddess. You can handle the most technical terrain imaginable, eat up steeps for breakfast and can ride stunts up to 8 feet high!
            </li>
          </ul>
          <hr></hr>
          <h3>Fitness Levels</h3>
          <h5>Level 1</h5>
          <ul>
            <li>You’re somewhat of a couch potato</li>
            <li>You cannot ride for more than an hour on flat terrain at a time, and the thought of climbing on a bike is daunting</li>
            <li>You exercise less than 1 hour per week</li>
          </ul>
          <h5>Level 2</h5>
          <ul>
            <li>You live a fairly sedentary life with little physical activity other than walking</li>
            <li>You can handle a 1-hour bike ride on flat terrain at a relaxed pace. Small, short hills are challenging to climb, but manageable</li>
            <li>You exercise on average 1 hour per week (including riding your bike)</li>
          </ul>
          <h5>Level 3 </h5>
          <ul>
            <li>You’re capable of riding 1-2 hours a day at a relaxed pace with several breaks</li>
            <li>You can handle one or two easy climbs of up to 350 vertical feet total
            </li>
            <li>You exercise on average 1-2 hours per week (including riding your bike)
            </li>
          </ul>
          <h5>Level 4</h5>
          <ul>
            <li>You can ride 2-3 hours at a moderate pace with several short breaks, over a few days</li>
            <li>You’re capable of climbing up to 1000ft vertical in a day
            </li>
            <li>You exercise on average 2-3 hours per week (including riding your bike)
            </li>
          </ul>
          <h5>Level 5</h5>
          <ul>
            <li>You’re capable of riding 4 hours a day at a moderate pace with some short breaks, over a few days</li>
            <li>You’re confident climbing up to a total of 1500ft vertical in a day</li>
            <li>You exercise on average 3-4 hours per week (including riding your bike)</li>
          </ul>
          <h5>Level 6 </h5>
          <ul>
            <li>You can ride 5 hours a day at a moderate pace with some short breaks, over a few days</li>
            <li>You can handle moderately steep climbs of up to a total of 2000ft vertical in a day
            </li>
            <li>You exercise on average 4-5 hours per week (including riding your bike)
            </li>
          </ul>
          <h5>Level 7</h5>
          <ul>
            <li>You can ride 6 hours a day at a moderately fast pace with a few breaks, over several days</li>
            <li>You can handle moderate climbs up to 2500ft vertical total in a day</li>
            <li>You exercise on average 5-7 hours per week (including riding your bike)
            </li>
          </ul>
          <h5>Level 8</h5>
          <ul>
            <li>You can ride up to 7 hours a day at a fast and steady pace over several days</li>
            <li>You have little trouble climbing 3500ft vertical in a day on steep terrain
            </li>
            <li>You exercise on average 7-9 hours per week (including riding your bike)</li>
          </ul>
          <h5>Level 9</h5>
          <ul>
            <li>You can ride up to 8 hours a day over several days, and tackle almost any climb the mountain throws your way</li>
            <li>You can handle steep, sustained climbs of up to 5000ft vertical in a day</li>
            <li>You exercise over 10 hours per week (including riding your bike)</li>
          </ul>
        </div>
      </div>
    </>
  )
}