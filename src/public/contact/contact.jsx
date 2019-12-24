import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import './contact.css';
import {Link} from "react-router-dom";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";


function Contact() {
  const [homepageData, setHomepageData] = useState({
    mainHeader: 'Default Main Heading',
    subHeader: 'Default Sub Heading',
    mainDescription: 'Default main description'
  });

  const [bannerImage, setBannerImage] = useState({backgroundImage: 'url(https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban.jpg)'});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);


  useEffect(() => {
    // async function fetchData() {
    //   const response = await axios.get('http://localhost:5000/data/5dafb1bb572dcf1398bfbf70');
    //   setHomepageData(response.data);
    //   console.log(response)
    // }
    //
    // fetchData();
  }, []);

  const determineScreenSize = () => {
    const w = window.innerWidth;
    if (w < 480) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban-205.jpg');
    } else if (w >= 480 && w < 780) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban-561.jpg');
    } else if (w >= 780 && w < 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-ban-907.jpg');
    } else if (w >= 1200) {
      setBannerImage('https://mtbbiketravel.s3.us-east-2.amazonaws.com/main-banner-1-9.jpg');
    }
  };

  useEffect(() => {
    //determineScreenSize();
  });

  const setField = (value, errorFunction, stateFunction) => {
    !value ? errorFunction(true) : errorFunction(false);
    stateFunction(value);
  };

  const validateForm = () => {
    return email.length > 0 && name.length > 0 && text.length > 0 && !emailError && !nameError && !textError;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name)
    console.log(email)
    console.log(text)

    // axios.post('http://localhost:5000/data/login', {username: email, password}, {
    //   headers: {
    //     'accept': 'application/json',
    //     'Accept-Language': 'en-US,en;q=0.8'
    //   }
    // }).then((response) => {
    //     console.log(response);
    //   }
    // ).catch((error) => {
    //     console.log(error);
    //   }
    // );

  }

  return (
    <div>
      <main className="">
          <div className="form-card">
            <Card className=''>
              <h2 className="contact-banner">Contact Us</h2>
              <form>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <OutlinedInput id="name-input" label="Name" variant="outlined"
                               required={true}
                               className=''
                               error={nameError}
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, setNameError, setName)}/>
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <OutlinedInput id="email-input" label="Email" variant="outlined"
                               required={true}
                               className=''
                               error={emailError}
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
                <InputLabel htmlFor="text-input">Questions or Comments</InputLabel>
                <TextField
                  id="text-input"
                  multiline
                  rows="10"
                  required={true}
                  className=''
                  defaultValue=""
                  variant="outlined"
                  error={textError}
                  fullWidth={true}
                  onBlur={e => setField(e.target.value, setTextError, setText)}
                />
                <input className="contact-submit-button" disabled={!validateForm()} type="submit" value="Submit" onClick={handleSubmit}/>
              </form>
            </Card>
          </div>
      </main>
    </div>
  );
}

export default Contact;
