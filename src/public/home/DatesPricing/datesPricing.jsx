import {useEffect, useState} from "react";
import React from "react";
import './datesPricing.css';
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CloseIcon from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import StarRateIcon from '@material-ui/icons/StarRate';

function DatesPricing() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [bestTime, setBestTime] = useState("");
  const [flexibleDates, setFlexibleDates] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

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

  const setField = (value, errorFunction, stateFunction) => {
    !value ? errorFunction(true) : errorFunction(false);
    stateFunction(value);
  };

  const validateForm = () => {
    return email.length > 0 && firstName.length > 0
      && lastName.length > 0 && phone.length > 0
      && !emailError && !firstNameError
      && !lastNameError && !phoneError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  const showFormModal = (index) => {
    setShowModal(true);
  };

  const showPrices = () => {
    if (windowSize > 768) {
      return (
        <div className={`tab-dates-section`}>
          <div className="flex-column">
            <div className="pricing-row title-row">
              <p></p>
              <p>Dates</p>
              <p>Riding Guest</p>
              <p>Non-riding Spouse/Partner</p>
              <p></p>
              <p></p>
            </div>
            <div className="pricing-row">
              <p>Week #1</p>
              <p>9/5/2020 through 9/11/2020</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={showFormModal}/></p>
            </div>
            <div className="pricing-row">
              <p>Week #2</p>
              <p>9/12/2020 through 9/18/2020</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={showFormModal}/></p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={`tab-dates-section`}>
          <div className="flex-column">
            <h5>Week #1</h5>
            <div className="pricing-row">
              <p>9/5/2020 through 9/11/2020</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={showFormModal}/></p>
            </div>
            <h5>Week #2</h5>
            <div className="pricing-row">
              <p>9/12/2020 through 9/18/2020</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={showFormModal}/></p>
            </div>
            <h5>Prices</h5>
            <div className="pricing-row title-row">
              <p>Riding Guest</p>
              <p>Non-riding Spouse/Partner</p>
            </div>
            <div className="pricing-row">
              <p>$4,000</p>
              <p>$3,000</p>
            </div>
          </div>
        </div>
      )
    }
  };

  const showBookModal = () => {
    if (windowSize > 768) {
      return (
        <div id="signUpModal" className={`modal ${showModal ? 'showSignUp' : 'dontShowSignUp'}`}>
          <div className="sign-up-form-card">
            <Card className=''>
              <div className="book-trip-banner-container">
                <div className="flex-column">
                  <h4 className="book-trip-banner">Book This Trip</h4>
                  <div className="required-text"><StarRateIcon color="primary" fontSize="small"/> - Required Fields</div>
                </div>
                <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
              </div>
              <form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="flex-row">
                    <div className="column-1">
                      <InputLabel htmlFor="first-name-input">First Name<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                      <OutlinedInput id="first-name-input" label="First Name" variant="outlined"
                                     required={true}
                                     className=''
                                     error={firstNameError}
                                     fullWidth={true}
                                     helperText="Incorrect entry."
                                     onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
                      <InputLabel htmlFor="email-input">Email<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                      <OutlinedInput id="email-input" label="Email" variant="outlined"
                                     required={true}
                                     className=''
                                     error={emailError}
                                     fullWidth={true}
                                     helperText="Incorrect entry."
                                     onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
                      <InputLabel htmlFor="best-time-input">Best Time To Call You</InputLabel>
                      <OutlinedInput id="best-time-input" label="Best Time" variant="outlined"
                                     className=''
                                     error={false}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, () => {}, setBestTime)}/>
                      <InputLabel htmlFor="dob-input">Date of Birth</InputLabel>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        placeholder="mm/dd/yyyy"
                        margin="normal"
                        id="date-picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date of birth',
                        }}
                      />
                    </div>
                    <div className="column-2">
                      <InputLabel htmlFor="last-name-input">Last Name<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                      <OutlinedInput id="last-name-input" label="Last Name" variant="outlined"
                                     required={true}
                                     className=''
                                     helperText="Incorrect entry."
                                     error={lastNameError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
                      <InputLabel htmlFor="phone-input">Phone Number<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                      <OutlinedInput id="phone-input" label="Phone" variant="outlined"
                                     required={true}
                                     className=''
                                     error={emailError}
                                     helperText="Incorrect entry."
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setPhoneError, setPhone)}/>
                      <InputLabel htmlFor="email-input">Are your dates flexible?</InputLabel>
                      <FormControlLabel value="Yes" control={<Radio checked={flexibleDates === 'yes'}/>} onClick={() => setFlexibleDates('yes')} label="Yes" />
                      <FormControlLabel value="No" control={<Radio checked={flexibleDates === 'no'}/>} onClick={() => setFlexibleDates('no')} label="No" />
                    </div>
                  </div>
                  <input className={`book-submit-button ${!validateForm() ? 'disabled-submit' : ''}`} disabled={!validateForm()} type="submit" value="Submit"
                         onClick={handleSubmit}/>
                </MuiPickersUtilsProvider>
              </form>
            </Card>
          </div>
        </div>
      )
    } else {
      return (
        <div id="signUpModal" className={`modal ${showModal ? 'showSignUp' : 'dontShowSignUp'}`}>
          <div className="sign-up-form-card">
            <Card className=''>
              <div className="book-trip-banner-container">
                <div>
                  <h4 className="book-trip-banner">Book This Trip</h4>
                  <div className="required-text"><StarRateIcon color="primary" fontSize="small"/> - Required Fields</div>
                </div>
                <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
              </div>
              <form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="flex-column">
                    <InputLabel htmlFor="first-name-input">First Name<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                    <OutlinedInput id="first-name-input" label="First Name" variant="outlined"
                                   required={true}
                                   className=''
                                   error={firstNameError}
                                   fullWidth={true}
                                   helperText="Incorrect entry."
                                   onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
                    <InputLabel htmlFor="last-name-input">Last Name<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                    <OutlinedInput id="last-name-input" label="Last Name" variant="outlined"
                                   required={true}
                                   className=''
                                   helperText="Incorrect entry."
                                   error={lastNameError}
                                   fullWidth={true}
                                   onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
                    <InputLabel htmlFor="email-input">Email<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                    <OutlinedInput id="email-input" label="Email" variant="outlined"
                                   required={true}
                                   className=''
                                   error={emailError}
                                   fullWidth={true}
                                   helperText="Incorrect entry."
                                   onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
                    <InputLabel htmlFor="phone-input">Phone Number<StarRateIcon color="primary" fontSize="small"/></InputLabel>
                    <OutlinedInput id="phone-input" label="Phone" variant="outlined"
                                   required={true}
                                   className=''
                                   error={emailError}
                                   helperText="Incorrect entry."
                                   fullWidth={true}
                                   onBlur={e => setField(e.target.value, setPhoneError, setPhone)}/>
                    <InputLabel htmlFor="dob-input">Date of Birth</InputLabel>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      placeholder="mm/dd/yyyy"
                      margin="normal"
                      id="date-picker"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date of birth',
                      }}
                    />
                    <InputLabel htmlFor="best-time-input">Best Time To Call You</InputLabel>
                    <OutlinedInput id="best-time-input" label="Best Time" variant="outlined"
                                   className=''
                                   error={false}
                                   fullWidth={true}
                                   onBlur={e => setField(e.target.value, () => {}, setBestTime)}/>
                    <InputLabel htmlFor="email-input">Are your dates flexible?</InputLabel>
                    <div className="flex-row">
                      <FormControlLabel value="Yes" control={<Radio checked={flexibleDates === 'yes'}/>} onClick={() => setFlexibleDates('yes')} label="Yes" />
                      <FormControlLabel value="No" control={<Radio checked={flexibleDates === 'no'}/>} onClick={() => setFlexibleDates('no')} label="No" />
                    </div>
                  </div>
                  <input className={`book-submit-button ${!validateForm() ? 'disabled-submit' : ''}`} disabled={!validateForm()} type="submit" value="Submit"
                         onClick={handleSubmit}/>
                </MuiPickersUtilsProvider>
              </form>
            </Card>
          </div>
        </div>
      )
    }
  };

  const clearModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showPrices()}
      {showBookModal()}
    </>
  )
}

export default DatesPricing;