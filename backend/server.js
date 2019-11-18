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

app.post("/photo", upload.single('file'), (req, res) => {
  try {

    const data = fs.readFileSync('./uploads/' + req.file.filename);
    sharp(data).metadata()
      .then(info => {
        const smW = Math.round(info.width * 11 / 100);
        const smH = Math.round(info.height * 11 / 100);
        const mW = Math.round(info.width * 29 / 100);
        const mH = Math.round(info.height * 29 / 100);
        const lgW = Math.round(info.width * 60 / 100);
        const lgH = Math.round(info.height * 60 / 100);
        const xlW = Math.round(info.width * 100 / 100);
        const xlH = Math.round(info.height * 100 / 100);

        sharp(data).resize(smW, smH).toFile(req.body.name + '-sm.jpg');
        sharp(data).resize(mW, mH).toFile(req.body.name + '-m.jpg');
        sharp(data).resize(lgW, lgH).toFile(req.body.name + '-lg.jpg');
        sharp(data).resize(xlW, xlH).toFile(req.body.name + '-xl.jpg');

        fs.readFile('./' + req.body.name + '-sm.jpg', function (err, data) {
          if (err) throw err;
          photoService.upload(data, req.body.name + '-sm.jpg');
        });
        fs.readFile('./' + req.body.name + '-m.jpg', function (err, data) {
          if (err) throw err;
          photoService.upload(data, req.body.name + '-m.jpg');
        });
        fs.readFile('./' + req.body.name + '-lg.jpg', function (err, data) {
          if (err) throw err;
          photoService.upload(data, req.body.name + '-lg.jpg');
        });
        fs.readFile('./' + req.body.name + '-xl.jpg', function (err, data) {
          if (err) throw err;
          photoService.upload(data, req.body.name + '-xl.jpg');
        });

      });

    fs.unlinkSync('./uploads/' + req.file.filename)

    res.status(200).send('pic uploaded');

  } catch (error) {
    console.log(error)
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

