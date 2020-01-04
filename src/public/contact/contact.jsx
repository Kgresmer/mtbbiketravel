import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import './contact.css';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {withRouter} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


function Contact(props) {
  const { history } = props;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const setField = (value, errorFunction, stateFunction) => {
    !value ? errorFunction(true) : errorFunction(false);
    stateFunction(value);
  };

  useEffect(() => {
    document.title = "Contact Us Form - Email"
  }, []);

  const validateForm = () => {
    return email.length > 0 && name.length > 0 && text.length > 0 && !emailError && !nameError && !textError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    const today = new Date();

    const emailBody = {
      "body": {
        "Html": {
          "Charset": "UTF-8",
          "Data": "<!DOCTYPE html><html><head></head>" +
            "<body><h1>Contact Request</h1>" +
            `<p>Today's Date: ${today.toDateString()}</p>` +
            `<p>Name: ${name}</p>` +
            `<p>Email: ${email}</p>` +
            `<p>Questions/Comments: ${text}</p>` +
            "</body>" +
            "</html>"
        }
      },
      "subject": `Contact Request - ${name} - ${today.toDateString()}`
    };

    await axios.post(' https://ke6gtdh7r8.execute-api.us-east-1.amazonaws.com/dev/book-email', emailBody, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      crossDomain: true
    }).then((response) => {
      setSubmitMessage("Thank you for message. We will in touch soon. ");
      setLoading(false);
      setTimeout(() => {
        history.push('/')
      }, 3000);

      }
    ).catch((error) => {
        setSubmitMessage("Something went wrong while trying to send your message. Please save your message in a note then reload the page and try again. ");
        setLoading(false);
      }
    );

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
                <button className="contact-submit-button" disabled={!validateForm() || loading}
                        type="button" value="Submit" onClick={handleSubmit}>{loading ? <CircularProgress color="white" /> : 'Submit'}</button>
              </form>
              {submitMessage && <h4>{submitMessage}</h4>}
            </Card>
          </div>
      </main>
    </div>
  );
}

export default withRouter(Contact);
