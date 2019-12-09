import React, {useState} from 'react';
import axios from 'axios';
import Nav from "../Nav";
import Card from '@material-ui/core/Card';
import './Login.css';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  textField: {
    'margin-bottom': '1em'
  },
  'form-card': {
    'width': '100%'
  }
}));

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const classes = useStyles();

  const validateForm = () => {
    return email.length > 0 && password.length > 0 && !emailError && !passwordError;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/data/login', {username: email, password}, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8'
      }
    }).then((response) => {
        console.log(response);
      }
    ).catch((error) => {
        console.log(error);
      }
    );

  }

  const setField = (value, errorFunction, stateFunction) => {
    !value ? errorFunction(true) : errorFunction(false);
    stateFunction(value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div>
      <Nav/>
      <div className={'form-card'}>
        <Card className={classes['form-card']}>
        <h2>Admin Login</h2>
          <form>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput id="email-input" label="Email" variant="outlined"
                           required={true}
                           className={classes.textField}
                           error={emailError}
                           fullWidth={true}
                           onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput id="password-input" label="Password" variant="outlined"
                           required={true}
                           className={classes.textField}
                           type={showPassword ? 'text' : 'password'}
                           error={passwordError}
                           fullWidth={true}
                           onBlur={e => setField(e.target.value, setPasswordError, setPassword)}
                           endAdornment={
                             <InputAdornment position="end">
                               <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                               >
                                 {showPassword ? <Visibility/> : <VisibilityOff/>}
                               </IconButton>
                             </InputAdornment>
                           }/>
            <input disabled={!validateForm()} type="submit" value="Submit" onClick={handleSubmit}/>
          </form>
        </Card>
      </div>
    </div>
  )
}