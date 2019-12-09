import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormData from 'form-data'
import './admin.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';


const Admin = () => {

    const SUCCESS = "Upload Successful! If the website still shows the old photos after reloading, try clearing your browser cache.";
    const FAILURE = "Something went wrong during the upload, please try again. Make sure the file has one of the following extensions: '.jpg', '.png'";
    const [formData, setFormData] = useState({mainDescription: ''});
    const [mhError, setMhError] = useState(false);
    const [shError, setShError] = useState(false);
    const [mdError, setMdError] = useState(false);
    const [pic, setPic] = useState(undefined);
    const [uploadMessage, setUploadMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Converting image!');
    const loadingMessages = [
      'Splitting into four different sizes',
      'Saving a local version',
      'Uploading to database',
      'Deleting local versions',
      'Pouring some tea',
      'Finalizing the format',
      'Waiting on AWS',
      'Formulating the response',
      'Double Checking',
      'Thinking about biking'
    ];
    let messageIndex = 0;
    let endInterval = () => {
    };

    const onDrop = (picture) => {
      setPic(picture.target.files[0]);
      setUploadMessage('');
    };

    const interval = (callback, length) => {
      return setInterval(callback, length);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const onSubmitPhoto = async (event) => {
      event.preventDefault();
      if (pic) {
        setLoading(true);
        endInterval = interval(() => {
          setLoadingMessage(loadingMessages[messageIndex]);
          if (messageIndex === loadingMessages.length - 1) {
            messageIndex = 0;
          } else {
            messageIndex++;
          }
        }, 1500);
        const result = await toBase64(pic).catch(e => e);
        if (result instanceof Error) {
          console.log('Error: ', result.message);
          return;
        }
        const formData = new FormData();
        formData.append('file', result, );
        formData.append('name', 'test-three');


        axios.post('http://localhost:5000/photo', formData, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Access-Control-Allow-Origin': '*',
            'content-type': 'undefined'
          }
        }).then((response) => {
            setLoading(false);
            messageIndex = 0;
            clearInterval(endInterval);
            console.log(response);
            setUploadMessage(SUCCESS);
          }
        ).catch((error) => {
            setLoading(false);
            messageIndex = 0;
            clearInterval(endInterval);
            console.log(error);
            setUploadMessage(FAILURE);
          }
        );
      }
    };

    const onSubmitData = (event) => {
      event.preventDefault();
      if (formData && formData.mainDescription && formData.mainHeader) {
        setLoading(true);
        endInterval = interval(() => {
          setLoadingMessage(loadingMessages[messageIndex]);
          if (messageIndex === loadingMessages.length - 1) {
            messageIndex = 0;
          } else {
            messageIndex++;
          }
        }, 1500);
        console.log(formData)
        const config = {headers: {"Accept": "application/json", 'Content-Type': "application/json"}};
        axios.put('http://localhost:5000/data/5dafb1bb572dcf1398bfbf70', formData, config).then((response) => {
            setLoading(false);
            messageIndex = 0;
            clearInterval(endInterval);
            console.log(response);
            setUploadMessage(SUCCESS);
          }
        ).catch((error) => {
            setLoading(false);
            messageIndex = 0;
            clearInterval(endInterval);
            console.log(error);
            setUploadMessage(FAILURE);
          }
        );
      }
    };

    const onFieldBlur = (e, fieldName, errorFunction) => {
      if (e.target.value) {
        errorFunction(false);
        formData[fieldName] = e.target.value;
        setFormData({...formData});
      } else {
        errorFunction(true);
      }
      console.log(formData)
    };

    const validateForm = () => {
      return formData.mainDescription.length > 0 && formData.mainHeader.length > 0 &&
        !mhError && !shError && !mdError;
    };

    return (
      <div style={{width: '100%'}}>
        <Card className='form-card'>
          <form>
            <TextField id="main-header-input" label="Main Header" variant="outlined"
                       required={true}
                       multiline
                       error={mhError}
                       onBlur={e => onFieldBlur(e, 'mainHeader', setMhError)}
                       helperText={mhError ? 'This field is required.' : ''}
                       fullWidth={true}
                       margin='normal'/>
            <TextField id="sub-header-input" label="Sub Header" variant="outlined"
                       required={true}
                       multiline
                       error={shError}
                       onBlur={e => onFieldBlur(e, 'subHeader', setShError)}
                       helperText={shError ? 'This field is required.' : ''}
                       fullWidth={true}
                       margin='normal'/>
            <TextField id="main-desc-input" label="Main Description" variant="outlined"
                       required={true}
                       multiline
                       error={mdError}
                       onBlur={e => onFieldBlur(e, 'mainDescription', setMdError)}
                       helperText={mdError ? 'This field is required.' : ''}
                       fullWidth={true}
                       margin='normal'/>
            <input disabled={!validateForm()} type="submit" value="UploadData" onClick={onSubmitData}/>
          </form>
        </Card>
        <Card className='form-card'>
          <form>
            <input type="file" name="file" onChange={p => onDrop(p)}/>
            <input type="submit" value="UploadPhoto" onClick={e => onSubmitPhoto(e)}/>
          </form>
        </Card>
        <Card>
          {loading ? (
            <div id="loadingContainer">
              <p>
                <FontAwesomeIcon className="fa-spin" icon="circle-notch"/>
                {loadingMessage}
                <FontAwesomeIcon className="fa-spin" icon="circle-notch"/>
              </p>
            </div>
          ) : ''}
          {uploadMessage}
        </Card>
      </div>
    );
  }
;

export default Admin;