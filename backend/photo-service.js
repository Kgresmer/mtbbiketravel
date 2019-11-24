const AWS = require('aws-sdk');
require("dotenv").config();
const fs = require('fs');

const photoBucket = 'mtbbiketravel';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.ACCESS_GET,
    secretAccessKey: process.env.SECRET_GET
  }
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: {Bucket: photoBucket}
});

const upload = (photoData, fileName) => {
  var params = {
    Key: fileName,
    Body: photoData
  };
  console.log('starting upload')
  return s3.upload(params, function (err, data) {
    console.log('inside upload')
    // Whether there is an error or not, delete the temp file
    fs.unlink('./' + fileName, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('Temp File Delete');
    });
    if (err) {
      console.log('ERROR MSG: ', err);
    } else {
      console.log('Successfully uploaded data');
    }
  });
}


module.exports = {
  upload: upload
};