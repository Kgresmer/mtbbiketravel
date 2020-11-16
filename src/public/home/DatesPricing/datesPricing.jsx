import {useEffect, useState} from "react";
import React from "react";
import './datesPricing.css';
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CloseIcon from '@material-ui/icons/Close';
import Card from "@material-ui/core/Card";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import MaskedInput from 'react-text-mask'
import {Link} from "react-router-dom";


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
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState("");
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({submitted: false, success: false, message: ''});
  // const [selectedDate, setSelectedDate] = React.useState(null);

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

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

  useEffect(() => {
    document.title = "Dates & Pricing"
  }, []);

  const setField = (value, errorFunction, stateFunction) => {
    !value ? errorFunction(true) : errorFunction(false);
    stateFunction(value);
  };

  const validateForm = () => {

    if (email.length > 0 && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && !emailError) {
      setEmailError(true);
      return false;
    }

    return email.length > 0 && firstName.length > 0
      && lastName.length > 0 && phone.length > 0
      && !emailError && !firstNameError
      && !lastNameError && !phoneError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    const today = new Date();
    setLoading(true);

    const emailBody = {
      "body": {
        "Html": {
          "Charset": "UTF-8",
          "Data": "<!DOCTYPE html><html><head></head>" +
            "<body><h1>Booking Request</h1>" +
            `<p>Today's Date: ${today.toDateString()}</p>` +
            `<p>Week Selected: ${modalData.week} - ${modalData.dates}</p>` +
            `<p>Name: ${firstName} ${lastName}</p>` +
            `<p>Email: ${email}</p>` +
            `<p>Phone: ${phone}</p>` +
            `<p>Best Time to call: ${bestTime}</p>` +
            "</body>" +
            "</html>"
        }
      },
      "subject": `Booking Request - ${firstName} ${lastName} - ${today.toDateString()}`
    };

    axios.post(' https://ke6gtdh7r8.execute-api.us-east-1.amazonaws.com/dev/book-email', emailBody, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      crossDomain: true
    }).then((response) => {
        setSubmitMessage({submitted: true, success: true, message: 'We will respond very soon!'});
        setLoading(false);
      }
    ).catch((error) => {
      console.log(error);
        setSubmitMessage({
          submitted: true,
          success: false,
          message: 'Something went wrong sending your request. Please reload the page and try again.'
        });
        setLoading(false);
      }
    );

  }

  const showFormModal = (week) => {
    setShowModal(true);
    const week1 = {
      week: "Week One",
      dates: "6/26/21 through 7/2/21"
    };
    const week2 = {
      week: "Week Two",
      dates: "7/3/21 through 7/9/21"
    };
    const week3 = {
      week: "Week Three",
      dates: "9/4/21 through 9/10/21"
    };
    const week4 = {
      week: "Week Four",
      dates: "9/11/21 through 9/17/21"
    };
    switch (week) {
      case 'week1':
        setModalData(week1);
        break;
      case 'week2':
        setModalData(week2);
        break;
      case 'week3':
        setModalData(week3);
        break;
      case 'week4':
        setModalData(week4);
        break;
    }
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
              <p>6/26/21 through 7/2/21</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={() => showFormModal('week1')}/></p>
            </div>
            <div className="pricing-row">
              <p>Week #2</p>
              <p>7/3/21 through 7/9/21</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={() => showFormModal('week2')}/></p>
            </div>
            <div className="pricing-row">
              <p>Week #3</p>
              <p>9/4/21 through 9/10/21</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={() => showFormModal('week3')}/></p>
            </div>
            <div className="pricing-row">
              <p>Week #4</p>
              <p>9/11/21 through 9/17/21</p>
              <p>$4,000</p>
              <p>$3,000</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP" onClick={() => showFormModal('week4')}/></p>
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
              <p>6/26/21 through 7/2/21</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP"
                        onClick={() => showFormModal('week1')}/></p>
            </div>
            <h5>Week #2</h5>
            <div className="pricing-row">
              <p>7/3/21 through 7/9/21</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP"
                        onClick={() => showFormModal('week2')}/></p>
            </div>
            <h5>Week #3</h5>
            <div className="pricing-row">
              <p>9/4/21 through 9/10/21</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP"
                        onClick={() => showFormModal('week3')}/></p>
            </div>
            <h5>Week #4</h5>
            <div className="pricing-row">
              <p>9/11/21 through 9/17/21</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP"
                        onClick={() => showFormModal('week4')}/></p>
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

  const showSubmitSuccess = () => {
    return (
      <>
        <div className="flex-column success-modal">
          <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
          <img src="https://mtbbiketravel.s3.us-east-2.amazonaws.com/success-booking.jpg" alt="swiss mountain view with a church"/>
          <h4>{submitMessage.message}</h4>
        </div>
      </>
    )
  };

  const showSubmitFailure = () => {
    return (
      <>
        <div className="flex-column success-modal">
          <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
          <h4>{submitMessage.message}</h4>
        </div>
      </>
    )
  };

  const showDesktopForm = () => {
    return (
      <>
        <div className="book-trip-banner-container">
          <div className="flex-column">
            <h4 className="book-trip-banner">Book This Trip</h4>
            <p>{modalData.week}</p>
            <p>{modalData.dates}</p>
            <p className="required-text"><span className="asterisk">*</span> - Required Fields</p>
          </div>
          <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
        </div>
        <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="flex-row">
              <div className="column-1">
                <InputLabel htmlFor="firstName">First Name <span className="asterisk">*</span></InputLabel>
                <OutlinedInput id="firstName" label="First Name" variant="outlined"
                               required={true}
                               className=''
                               inputProps={{maxLength: 25, name: 'firstName'}}
                               error={firstNameError}
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
                <InputLabel htmlFor="email">Email <span className="asterisk">*</span>{emailError && <span className="error-email">Invalid Email</span>}</InputLabel>
                <OutlinedInput id="email" label="Email" variant="outlined"
                               required={true}
                               className=''
                               inputProps={{maxLength: 30, name: 'email'}}
                               error={emailError}
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
                <InputLabel htmlFor="best-time-input">Best Time To Call You</InputLabel>
                <OutlinedInput id="best-time-input" label="Best Time" variant="outlined"
                               className=''
                               error={false}
                               inputProps={{maxLength: 70}}
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, () => {
                               }, setBestTime)}/>
                {/*<InputLabel htmlFor="dob-input">Date of Birth</InputLabel>*/}
                {/*<KeyboardDatePicker*/}
                {/*disableToolbar*/}
                {/*variant="inline"*/}
                {/*format="MM/dd/yyyy"*/}
                {/*placeholder="mm/dd/yyyy"*/}
                {/*margin="normal"*/}
                {/*id="date-picker"*/}
                {/*value={selectedDate}*/}
                {/*onChange={handleDateChange}*/}
                {/*KeyboardButtonProps={{*/}
                {/*'aria-label': 'change date of birth',*/}
                {/*}}*/}
                {/*/>*/}
              </div>
              <div className="column-2">
                <InputLabel htmlFor="last-name-input">Last Name <span className="asterisk">*</span></InputLabel>
                <OutlinedInput id="last-name-input" label="Last Name" variant="outlined"
                               required={true}
                               className=''
                               inputProps={{maxLength: 25, name: 'lastName'}}
                               error={lastNameError}
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
                <InputLabel htmlFor="phone-input">Phone Number <span className="asterisk">*</span></InputLabel>
                <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth"
                     label="phone" variant="outlined">
                <MaskedInput
                  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-fullWidth"
                  placeholder=""
                  id="phone"
                  name="phone"
                  error={'Invalid value'}
                  required={true}
                  onBlur={e => setField(e.target.value, setPhoneError, setPhone)}
                />
                  <fieldset aria-hidden="true" className={`PrivateNotchedOutline MuiOutlinedInput-notchedOutline ${phoneError ? 'errorBorder' : ''}`}
                            style={{paddingLeft: '8px'}}>
                    <legend className="PrivateNotchedOutline-legend-96" style={{width: '0.01px'}}><span>&#8203;</span>
                    </legend>
                  </fieldset>
                </div>
                {/*<InputLabel htmlFor="email-input">Are your dates flexible?</InputLabel>*/}
                {/*<FormControlLabel value="Yes" control={<Radio checked={flexibleDates === 'yes'}/>} onClick={() => setFlexibleDates('yes')} label="Yes" />*/}
                {/*<FormControlLabel value="No" control={<Radio checked={flexibleDates === 'no'}/>} onClick={() => setFlexibleDates('no')} label="No" />*/}
              </div>
            </div>
            <button className={`book-submit-button ${!validateForm() ? 'disabled-submit' : ''}`}
                    disabled={!validateForm() || loading} type="button"
                    onClick={handleSubmit}>{loading ? <CircularProgress color="white"/> : 'Submit'}</button>
          </MuiPickersUtilsProvider>
        </form>
      </>
    )
  };

  const showMobileForm = () => {
    return (
      <>
        <div className="book-trip-banner-container">
          <div>
            <h4 className="book-trip-banner">Book This Trip</h4>
            <p>{modalData.week}</p>
            <p>{modalData.dates}</p>
            <div className="required-text"><span className="asterisk">*</span> - Required Fields</div>
          </div>
          <button className="close-sign-up" onClick={clearModal}><CloseIcon fontSize="large"/></button>
        </div>
        <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="flex-column">
              <InputLabel htmlFor="firstName">First Name <span className="asterisk">*</span></InputLabel>
              <OutlinedInput id="firstName" label="First Name" variant="outlined"
                             required={true}
                             className=''
                             inputProps={{maxLength: 25, name: 'firstName'}}
                             error={firstNameError}
                             fullWidth={true}
                             onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
              <InputLabel htmlFor="lastName">Last Name <span className="asterisk">*</span></InputLabel>
              <OutlinedInput id="lastName" label="Last Name" variant="outlined"
                             required={true}
                             className=''
                             inputProps={{maxLength: 25, name: 'lastName'}}
                             error={lastNameError}
                             fullWidth={true}
                             onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
              <InputLabel htmlFor="email">Email <span className="asterisk">*</span></InputLabel>
              <OutlinedInput id="email" label="Email" variant="outlined"
                             required={true}
                             className=''
                             inputProps={{maxLength: 35, name: 'email'}}
                             error={emailError}
                             fullWidth={true}
                             onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
              <InputLabel htmlFor="phone-input">Phone Number <span className="asterisk">*</span></InputLabel>
              <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth"
                   label="phone" variant="outlined" required>
                <MaskedInput
                  mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-fullWidth"
                  placeholder=""
                  name="phone"
                  id="phone"
                  error={'Invalid value'}
                  required
                  onBlur={e => setField(e.target.value, setPhoneError, setPhone)}
                />
                <fieldset aria-hidden="true" className={`PrivateNotchedOutline MuiOutlinedInput-notchedOutline ${phoneError ? 'errorBorder' : ''}`}
                          style={{paddingLeft: '8px'}}>
                  <legend className="PrivateNotchedOutline-legend-96" style={{width: '0.01px'}}><span>&#8203;</span>
                  </legend>
                </fieldset>
              </div>
              {/*<InputLabel htmlFor="dob-input">Date of Birth</InputLabel>*/}
              {/*<KeyboardDatePicker*/}
              {/*disableToolbar*/}
              {/*variant="inline"*/}
              {/*format="MM/dd/yyyy"*/}
              {/*placeholder="mm/dd/yyyy"*/}
              {/*margin="normal"*/}
              {/*id="date-picker"*/}
              {/*value={selectedDate}*/}
              {/*onChange={handleDateChange}*/}
              {/*KeyboardButtonProps={{*/}
              {/*'aria-label': 'change date of birth',*/}
              {/*}}*/}
              {/*/>*/}
              <InputLabel htmlFor="best-time-input">Best Time To Call You</InputLabel>
              <OutlinedInput id="best-time-input" label="Best Time" variant="outlined"
                             className=''
                             error={false}
                             inputProps={{maxLength: 70}}
                             fullWidth={true}
                             onBlur={e => setField(e.target.value, () => {
                             }, setBestTime)}/>
              {/*<InputLabel htmlFor="email-input">Are your dates flexible?</InputLabel>*/}
              {/*<div className="flex-row">*/}
              {/*<FormControlLabel value="Yes" control={<Radio checked={flexibleDates === 'yes'}/>} onClick={() => setFlexibleDates('yes')} label="Yes" />*/}
              {/*<FormControlLabel value="No" control={<Radio checked={flexibleDates === 'no'}/>} onClick={() => setFlexibleDates('no')} label="No" />*/}
              {/*</div>*/}
            </div>
            <button className={`book-submit-button ${!validateForm() ? 'disabled-submit' : ''}`}
                    disabled={!validateForm() || loading} type="button"
                    onClick={handleSubmit}>{loading ? <CircularProgress color="white"/> : 'Submit'}</button>
          </MuiPickersUtilsProvider>
        </form>
      </>
    )
  };

  const showForm = () => {
    if (!submitMessage.submitted) {
      return showDesktopForm();
    } else if (submitMessage.submitted && submitMessage.success) {
      return showSubmitSuccess();
    } else if (submitMessage.submitted && !submitMessage.success) {
      return showSubmitFailure();
    }
  };

  const showMobile = () => {
    if (!submitMessage.submitted) {
      return showMobileForm();
    } else if (submitMessage.submitted && submitMessage.success) {
      return showSubmitSuccess();
    } else if (submitMessage.submitted && !submitMessage.success) {
      return showSubmitFailure();
    }
  };

  const showBookModal = () => {
    if (windowSize > 768) {
      return (
        <div id="signUpModal" className={`modal ${showModal ? 'showSignUp' : 'dontShowSignUp'}`}>
          <div className="sign-up-form-card">
            <Card className=''>
              {showForm()}
            </Card>
          </div>
        </div>
      )
    } else {
      return (
        <div id="signUpModal" className={`modal ${showModal ? 'showSignUp' : 'dontShowSignUp'}`}>
          <div className="sign-up-form-card">
            <Card className=''>
              {showMobile()}
            </Card>
          </div>
        </div>
      )
    }
  };

  const clearModal = () => {
    setShowModal(false);
    setSubmitMessage('');
  };

  return (
    <div className="flex-column" style={{width: '100%'}}>
      <div>
        {showPrices()}
        {showBookModal()}
      </div>
      <div style={{alignSelf: 'center'}}>
        <p>Travel Insurance is mandatory for this trip. For more <Link to={'home#WhatsIncluded-whats-not'}>info click here.</Link></p>
      </div>
    </div>
  )
}

export default DatesPricing;