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
      dates: "9/5/2020 through 9/11/2020"
    }
    const week2 = {
      week: "Week Two",
      dates: "9/12/2020 through 9/18/2020"
    }
    if (week === 'week1') {
      setModalData(week1);
    } else {
      setModalData(week2);
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
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP"
                        onClick={() => showFormModal('week1')}/></p>
            </div>
            <h5>Week #2</h5>
            <div className="pricing-row">
              <p>9/12/2020 through 9/18/2020</p>
              <p className="available-date">Available</p>
              <p><input className="date-one-button" type="button" value="BOOK THIS TRIP"
                        onClick={() => showFormModal('week2')}/></p>
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
          <img src="https://mtbbiketravel.s3.us-east-2.amazonaws.com/success-booking.jpg"/>
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
                <InputLabel htmlFor="first-name-input">First Name <span className="asterisk">*</span></InputLabel>
                <OutlinedInput id="first-name-input" label="First Name" variant="outlined"
                               required={true}
                               className=''
                               error={firstNameError}
                               fullWidth={true}
                               helperText="Incorrect entry."
                               onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
                <InputLabel htmlFor="email-input">Email <span className="asterisk">*</span></InputLabel>
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
                               helperText="Incorrect entry."
                               error={lastNameError}
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
                <InputLabel htmlFor="phone-input">Phone Number <span className="asterisk">*</span></InputLabel>
                <OutlinedInput id="phone-input" label="Phone" variant="outlined"
                               required={true}
                               className=''
                               error={emailError}
                               helperText="Incorrect entry."
                               fullWidth={true}
                               onBlur={e => setField(e.target.value, setPhoneError, setPhone)}/>
                {/*<InputLabel htmlFor="email-input">Are your dates flexible?</InputLabel>*/}
                {/*<FormControlLabel value="Yes" control={<Radio checked={flexibleDates === 'yes'}/>} onClick={() => setFlexibleDates('yes')} label="Yes" />*/}
                {/*<FormControlLabel value="No" control={<Radio checked={flexibleDates === 'no'}/>} onClick={() => setFlexibleDates('no')} label="No" />*/}
              </div>
            </div>
            <button className={`book-submit-button ${!validateForm() ? 'disabled-submit' : ''}`}
                    disabled={!validateForm() || loading} type="button"
                    onClick={handleSubmit}>{loading ? <CircularProgress color="white" /> : 'Submit'}</button>
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
              <InputLabel htmlFor="first-name-input">First Name <span className="asterisk">*</span></InputLabel>
              <OutlinedInput id="first-name-input" label="First Name" variant="outlined"
                             required={true}
                             className=''
                             error={firstNameError}
                             fullWidth={true}
                             helperText="Incorrect entry."
                             onBlur={e => setField(e.target.value, setFirstNameError, setFirstName)}/>
              <InputLabel htmlFor="last-name-input">Last Name <span className="asterisk">*</span></InputLabel>
              <OutlinedInput id="last-name-input" label="Last Name" variant="outlined"
                             required={true}
                             className=''
                             helperText="Incorrect entry."
                             error={lastNameError}
                             fullWidth={true}
                             onBlur={e => setField(e.target.value, setLastNameError, setLastName)}/>
              <InputLabel htmlFor="email-input">Email <span className="asterisk">*</span></InputLabel>
              <OutlinedInput id="email-input" label="Email" variant="outlined"
                             required={true}
                             className=''
                             error={emailError}
                             fullWidth={true}
                             helperText="Incorrect entry."
                             onBlur={e => setField(e.target.value, setEmailError, setEmail)}/>
              <InputLabel htmlFor="phone-input">Phone Number <span className="asterisk">*</span></InputLabel>
              <OutlinedInput id="phone-input" label="Phone" variant="outlined"
                             required={true}
                             className=''
                             error={emailError}
                             helperText="Incorrect entry."
                             fullWidth={true}
                             onBlur={e => setField(e.target.value, setPhoneError, setPhone)}/>
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
                    onClick={handleSubmit}>{loading ? <CircularProgress color="white" /> : 'Submit'}</button>
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
    <>
      {showPrices()}
      {showBookModal()}
    </>
  )
}

export default DatesPricing;