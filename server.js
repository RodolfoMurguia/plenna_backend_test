
var express = require('express');
var mongooose = require('mongoose');
var bodyParser = require('body-parser');

//local requires
var Doctor = require('./api/models/DoctorModels');
var DoctorRoutes = require('./api/routes/DoctorRoutes');

//info about database
mongooose.Promise = global.Promise;
mongooose.connect('mongodb://docker:mongopw@localhost:49153', {dbName: "plenna"});


var app = express();

//middleware and special configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set routes
DoctorRoutes(app);

//start server
app.listen(3000);

//notify server is running
console.log('Medical Aplication is running on port 3000');