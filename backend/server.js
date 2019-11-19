const photoService = require('./photo-service.js');
const Express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const sharp = require('sharp');
const fs = require('fs');
const bodyParser = require('body-parser')
const multer = require('multer');
const fileUpload = require('express-fileupload');



const HomePageModel = mongoose.model('homepages', {
  title: String,
  summary: String
});

const app = Express();
const port = process.env.PORT || 5000;

var whitelist = ['http://localhost:3000', "http://localhost:5000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));


const upload = multer({ dest: 'uploads/' });

const resizeAndUpload = (data, percent, extension, fileName) => {
  sharp(data).metadata()
    .then(info => {
      const smW = Math.round(info.width * percent / 100);
      const smH = Math.round(info.height * percent / 100);

      sharp(data).resize(smW, smH).toFile(fileName + extension).then((s) => {
        console.log(s);
        fs.readFile('./' + fileName + extension, function (err, data) {
          if (err) throw err;
          photoService.upload(data, fileName + extension);
        });
      });
    });
};

app.post("/photo", upload.single('file'), (req, res) => {
  try {

    const data = fs.readFileSync('./uploads/' + req.file.filename);

    resizeAndUpload(data, 11, '-sm.jpg', req.body.name);
    resizeAndUpload(data, 29, '-m.jpg', req.body.name);
    resizeAndUpload(data, 60, '-lg.jpg', req.body.name);
    resizeAndUpload(data, 100, '-xl.jpg', req.body.name);

    fs.unlinkSync('./uploads/' + req.file.filename);

    res.status(200).send('pic uploaded');

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/data", async (request, response) => {
  try {
    let model = new HomePageModel(request.body);
    var result = await model.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/data/:id", async (request, response) => {
  try {
    var homePage = await HomePageModel.findById(request.params.id).exec();
    response.send(homePage);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/data/:id", async (request, response) => {
  try {
    var person = await HomePageModel.findById(request.params.id).exec();
    person.set(request.body);
    var result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('mongo db connection established');
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

