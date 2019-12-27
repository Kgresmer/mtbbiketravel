import React, { useState} from 'react';
import Card from '@material-ui/core/Card';
import './contact.css';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";


function Contact() {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);


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
