const Mongoose = require("mongoose");
const Express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const HomePageModel = Mongoose.model('homepages', {
  title: String,
  summary: String
});

const app = Express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(Express.json());


app.post("/photo", async (request, response) => {
  try {
    var result = await HomePageModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/data", async (request, response) => {
  try {
    console.log("data post")
    let model = new HomePageModel({title: 'Sigrid', summary: 'version'});
    var result = await model.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/person/:id", async (request, response) => {
  try {
    var person = await PersonModel.findById(request.params.id).exec();
    response.send(person);
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

