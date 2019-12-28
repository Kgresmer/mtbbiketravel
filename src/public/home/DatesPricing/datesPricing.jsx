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

function DatesPricing() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState(false);
  const [bestTime, setBestTime] = useState("");
  const [bestTimeError, setBestTimeError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState(false);
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState('');
  const [showFlexibleError, setShowFlexibleError] = useState(false);
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
    return email.length > 0 && firstName.length > 0 && !emailError && !firstNameError && !lastNameError;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!flexibleDates) {
      setShowFlexibleError(true);
      return;
    }

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
                <h4 className="book-trip-banner">Book This Trip</h4>
                <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
              </div>
              <form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="flex-row">
                    <div className="column-1">
                      <InputLabel htmlFor="first-name-input">First Name</InputLabel>
                      <OutlinedInput id="first-name-input" label="First Name" variant="outlined"
                                     required={true}
                                     className=''
                                     error={firstNameError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
                      <InputLabel htmlFor="email-input">Email</InputLabel>
                      <OutlinedInput id="email-input" label="Email" variant="outlined"
                                     required={true}
                                     className=''
                                     error={emailError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
                      <InputLabel htmlFor="city-input">City</InputLabel>
                      <OutlinedInput id="city-input" label="City" variant="outlined"
                                     required={true}
                                     className=''
                                     error={cityError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setCityError, setCity)}/>
                      <InputLabel htmlFor="zip-input">Zip / Postal Code</InputLabel>
                      <OutlinedInput id="zip-input" label="Zip" variant="outlined"
                                     required={true}
                                     className=''
                                     type="number"
                                     error={zipError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setZipError, setZip)}/>
                      <InputLabel htmlFor="dob-input">Date of Birth</InputLabel>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        placeholder="mm/dd/yyyy"
                        margin="normal"
                        required={true}
                        id="date-picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date of birth',
                        }}
                      />
                      <InputLabel htmlFor="best-time-input">Best Time To Call You</InputLabel>
                      <OutlinedInput id="best-time-input" label="Best Time" variant="outlined"
                                     required={true}
                                     className=''
                                     error={bestTimeError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setBestTimeError, setBestTime)}/>
                    </div>
                    <div className="column-2">
                      <InputLabel htmlFor="last-name-input">Last Name</InputLabel>
                      <OutlinedInput id="last-name-input" label="Last Name" variant="outlined"
                                     required={true}
                                     className=''
                                     error={lastNameError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
                      <InputLabel htmlFor="address-input">Address</InputLabel>
                      <OutlinedInput id="address-input" label="Address" variant="outlined"
                                     required={true}
                                     className=''
                                     error={addressError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setAddressError, setAddress)}/>
                      <InputLabel htmlFor="state-input">State</InputLabel>
                      <OutlinedInput id="state-input" label="State" variant="outlined"
                                     required={true}
                                     className=''
                                     error={stateError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setStateError, setState)}/>
                      <InputLabel htmlFor="country-input">Country</InputLabel>
                      <OutlinedInput id="country-input" label="Country" variant="outlined"
                                     required={true}
                                     className=''
                                     error={countryError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setCountryError, setCountry)}/>
                      <InputLabel htmlFor="email-input">Are your dates flexible?</InputLabel>
                      <FormControlLabel value="Yes" control={<Radio checked={flexibleDates === 'yes'}/>} onClick={() => setFlexibleDates('yes')} label="Yes" />
                      <FormControlLabel value="No" control={<Radio checked={flexibleDates === 'no'}/>} onClick={() => setFlexibleDates('no')} label="No" />
                      {showFlexibleError && <p className="flexible-error">Please select Yes or No</p>}
                    </div>
                  </div>
                  <input className="contact-submit-button" disabled={!validateForm()} type="submit" value="Submit"
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
                <h4 className="book-trip-banner">Book This Trip</h4>
                <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
              </div>
              <form>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div className="flex-column">
                      <InputLabel htmlFor="first-name-input">First Name</InputLabel>
                      <OutlinedInput id="first-name-input" label="First Name" variant="outlined"
                                     required={true}
                                     className=''
                                     error={firstNameError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
                    <InputLabel htmlFor="last-name-input">Last Name</InputLabel>
                    <OutlinedInput id="last-name-input" label="Last Name" variant="outlined"
                                   required={true}
                                   className=''
                                   error={lastNameError}
                                   fullWidth={true}
                                   onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
                      <InputLabel htmlFor="email-input">Email</InputLabel>
                      <OutlinedInput id="email-input" label="Email" variant="outlined"
                                     required={true}
                                     className=''
                                     error={emailError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
                      <InputLabel htmlFor="dob-input">Date of Birth</InputLabel>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        placeholder="mm/dd/yyyy"
                        margin="normal"
                        required={true}
                        id="date-picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date of birth',
                        }}
                      />
                      <InputLabel htmlFor="best-time-input">Best Time To Call You</InputLabel>
                      <OutlinedInput id="best-time-input" label="Best Time" variant="outlined"
                                     required={true}
                                     className=''
                                     error={bestTimeError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setBestTimeError, setBestTime)}/>
                      <InputLabel htmlFor="address-input">Address</InputLabel>
                      <OutlinedInput id="address-input" label="Address" variant="outlined"
                                     required={true}
                                     className=''
                                     error={addressError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setAddressError, setAddress)}/>
                    <InputLabel htmlFor="city-input">City</InputLabel>
                    <OutlinedInput id="city-input" label="City" variant="outlined"
                                   required={true}
                                   className=''
                                   error={cityError}
                                   fullWidth={true}
                                   onBlur={e => setField(e.target.value, setCityError, setCity)}/>
                    <InputLabel htmlFor="zip-input">Zip / Postal Code</InputLabel>
                    <OutlinedInput id="zip-input" label="Zip" variant="outlined"
                                   required={true}
                                   className=''
                                   type="number"
                                   error={zipError}
                                   fullWidth={true}
                                   onBlur={e => setField(e.target.value, setZipError, setZip)}/>
                      <InputLabel htmlFor="state-input">State</InputLabel>
                      <OutlinedInput id="state-input" label="State" variant="outlined"
                                     required={true}
                                     className=''
                                     error={stateError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setStateError, setState)}/>
                      <InputLabel htmlFor="country-input">Country</InputLabel>
                      <OutlinedInput id="country-input" label="Country" variant="outlined"
                                     required={true}
                                     className=''
                                     error={countryError}
                                     fullWidth={true}
                                     onBlur={e => setField(e.target.value, setCountryError, setCountry)}/>
                      <InputLabel htmlFor="email-input">Are your dates flexible?</InputLabel>
                      <FormControlLabel value="Yes" control={<Radio checked={flexibleDates === 'yes'}/>} onClick={() => setFlexibleDates('yes')} label="Yes" />
                      <FormControlLabel value="No" control={<Radio checked={flexibleDates === 'no'}/>} onClick={() => setFlexibleDates('no')} label="No" />
                      {showFlexibleError && <p className="flexible-error">Please select Yes or No</p>}
                  </div>
                  <input className="contact-submit-button" disabled={!validateForm()} type="submit" value="Submit"
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