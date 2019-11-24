const photoService = require('./photo-service.js');
const Express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const sharp = require('sharp');
const fs = require('fs');
const multer = require('multer');


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

const resizeAndUpload = async (data, percent, extension, fileName) => {
  let w, h;
  await sharp(data).metadata()
    .then(info => {

      if (info.width < 1300) {
        const ratio = info.width / info.height;
        info.width = 1300;
        info.height = ratio * info.width;
      }

      w = Math.round(info.width * percent / 100);
      h = Math.round(info.height * percent / 100);
      console.log('done getting sizes')

    });
  if (w && h) {
    await sharp(data).resize(w, h).toFile(fileName + extension).then((s) => {
      console.log('resized ' + extension);
    });

  }
};

const readFile = async (extension, fileName) => {
  return await fs.readFileSync('./' + fileName + extension);
}

app.post("/photo", upload.single('file'), async (req, res) => {
  try {
    const data = fs.readFileSync('./uploads/' + req.file.filename);

    await resizeAndUpload(data, 42, '-sm.jpg', req.body.name);
    await resizeAndUpload(data, 65, '-m.jpg', req.body.name);
    await resizeAndUpload(data, 75, '-lg.jpg', req.body.name);
    await resizeAndUpload(data, 100, '-xl.jpg', req.body.name);
    const smFile = await readFile('-sm.jpg', req.body.name);
    const mFile = await readFile('-m.jpg', req.body.name);
    const lgFile = await readFile('-lg.jpg', req.body.name);
    const xlFile = await readFile('-xl.jpg', req.body.name);

    const upload1 = photoService.upload(smFile, req.body.name + '-sm.jpg').promise();
    const upload2 = photoService.upload(mFile, req.body.name + '-m.jpg').promise();
    const upload3 = photoService.upload(lgFile, req.body.name + '-lg.jpg').promise();
    const upload4 = photoService.upload(xlFile, req.body.name + '-xl.jpg').promise();

    upload1.then(() => {
      console.log('upload 1 resolved');
      fs.unlink('./' + req.body.name + '-sm.jpg', function (err) {
        if (err) {
          console.error(err);
        }
        console.log('Temp File Delete');
      });
    }).catch((err) => {
      throw err;
    })

    upload2.then(() => {
      console.log('upload 2 resolved');
      fs.unlink('./' + req.body.name + '-m.jpg', function (err) {
        if (err) {
          console.error(err);
        }
        console.log('Temp File Delete');
      });
    }).catch((err) => {
      throw err;
    })

    upload3.then(() => {
      console.log('upload 3 resolved');
      fs.unlink('./' + req.body.name + '-lg.jpg', function (err) {
        if (err) {
          console.error(err);
        }
        console.log('Temp File Delete');
      });
    }).catch((err) => {
      throw err;
    })

    upload4.then(() => {
      console.log('upload 4 resolved');
      fs.unlink('./' + req.body.name + '-xl.jpg', function (err) {
        if (err) {
          console.error(err);
        }
        console.log('Temp File Delete');
      });
    }).catch((err) => {
      throw err;
    })

    Promise.all([upload1, upload2, upload3, upload4]).then(() => {
      fs.unlinkSync('./uploads/' + req.file.filename);
      console.log('unlinking and sending response _______________________')
      res.status(200).send('pic uploaded');
    });


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

