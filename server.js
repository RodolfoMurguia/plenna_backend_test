
var express = require('express');
var mongooose = require('mongoose');
var bodyParser = require('body-parser');
require("dotenv").config();

const DB_ACCESS_KEY = process.env.DB_ACCESS_KEY;
const PORT = process.env.PORT;

//local requires
var DoctorRoutes = require('./api/routes/DoctorRoutes');
var PacientRoutes = require('./api/routes/PacientRoutes');
var ConsultationRoutes = require('./api/routes/ConsultationRoutes');
var MedicalHistoryRoutes = require('./api/routes/MedicalHistoryRoutes');

var Doctor = require('./api/models/DoctorModels');
var Pacient = require('./api/models/PacientModel');
var Consultation = require('./api/models/ConsultationModel');
var MedicalHistory = require('./api/models/MedicalHistoryModel');

//info about database
mongooose.Promise = global.Promise;
mongooose.connect(DB_ACCESS_KEY, {dbName: "plenna"});


var app = express();

//middleware and special configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set routes
DoctorRoutes(app);
PacientRoutes(app);
ConsultationRoutes(app);
MedicalHistoryRoutes(app);

//start server
app.listen(PORT);

//notify server is running
console.log('Medical Aplication is running on port ' + PORT);