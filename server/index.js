const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const locationApi = require('./api/location');
const path = require('path');
require('dotenv').config();
require('./database');

const app = express();

const port = process.env.PORT || 5000;

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/api', locationApi);


app.use((err, req, res, next) => {
  next();
});

if(process.env.NODE_ENV === "prodeuction"){
  // ... other app.use middleware 
  app.use(express.static(path.join(__dirname, "client", "build")));
  
  //...
  //Right before your app.listen(), add this:
  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

}

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});