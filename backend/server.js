const photoService = require('./photo-service.js');
const Express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const sharp = require('sharp');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');
var i  = 'MtnBikeTravel';          // Issuer
var s  = 'admin@mtnbiketravel.com';        // Subject
var a  = 'http://mtnbiketravel.com'; // Audience

const HomePageModel = mongoose.model('homepages', {
  mainHeader: String,
  subHeader: String,
  mainDescription: String
});

const LoginModel = mongoose.model('login', {
  username: String,
  hash: String
});

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);
const app = Express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '10mb', extended: true}))

var whitelist = ["http://localhost:3000", "http://localhost:5000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log("allowed");
      callback(null, true)
    } else {
      console.log("not allowed" + whitelist.indexOf(origin) !== -1)
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

app.post("/photo", async (req, res) => {
  try {
    //const single = upload.single('file');

    const uri = req.body.file.toString().split(';base64,').pop();
    //let buffer = Buffer.from(uri, 'base64');
    fs.writeFileSync('uploads/tempfile.jpg', uri, 'base64');

    const data = fs.readFileSync('./uploads/tempfile.jpg');
    if (data) {
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
    } else {
      console.log('No file found! Upload error probably occurred. ')
    }


  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/data", async (request, response) => {
  try {
    var verifyOptions = {
      issuer:  i,
      subject:  s,
      audience:  a,
      expiresIn:  "1h",
      algorithm:  ["RS256"]
    };
    var legit = jwt.verify(request.body.token, publicKEY, verifyOptions);
    console.log("\nJWT verification result: " + JSON.stringify(legit));

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

app.post("/data/login", async (request, response) => {
  try {
    console.log(request.body)
    if (!request.body.username || request.body.username.length < 6 ||
      !request.body.password || request.body.password.length < 6) {
      console.log('request body messed up?!')
      response.write("Credentials not valid. ");
      response.send();
    }

    const username = request.body.username;
    const password = request.body.password;

    await LoginModel.findOne({username: username}, function(err, credentials) {
      console.log(credentials)
      if (err || !credentials) {
        response.write("Credentials not valid. ");
        response.send();
      }

      bcrypt.compare(password, credentials.hash).then(isMatch => {
        if (isMatch) {
          const payload = {id: credentials.id, username: username };
          console.log('password match found')

          var signOptions = {
            issuer:  i,
            subject:  s,
            audience:  a,
            expiresIn:  "1h",
            algorithm:  "RS256"
          };

          const token = jwt.sign(payload, privateKEY, signOptions);
          console.log(token);
          response.write(token);
          response.send();
        } else {
          console.log('password DID NOT MATCH')

          response.write("Credentials not valid. ");
          response.send();
        }
      })
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/data/create", async (request, response) => {
  try {
    console.log(request.body);
    if (!request.body.username || request.body.username.length < 6 ||
      !request.body.password || !request.body.password.length < 6) {
      response.status(400).send("Username or password is not valid or too short");
    }

    if (!request.body.secret && request.body.secret === 'beachbar') {
      response.status(403).send("You are not authorized to create a user. ");
    }

    const username = request.body.username;
    const password = request.body.password;

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
        const model = new LoginModel({username, hash});
        const result = await model.save();
        response.send(result);
      });
    });

  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/data/:id", async (request, response) => {
  try {
    var verifyOptions = {
      issuer:  i,
      subject:  s,
      audience:  a,
      expiresIn:  "1h",
      algorithm:  ["RS256"]
    };
    var legit = jwt.verify(request.body.token, publicKEY, verifyOptions);
    console.log("\nJWT verification result: " + JSON.stringify(legit));

    var person = await HomePageModel.findById(request.params.id).exec();
    person.set({...request.body, _id: request.params.id});
    var result = await person.save();
    response.send(result);
  } catch (error) {
    console.log(error)
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

