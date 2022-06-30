"use strict";

//import libraries and models
const mongooose = require("mongoose");
const Doctor = mongooose.model("Doctor");

// create a new doctor
exports.CreateDoctor = function (req, res) {
  var doctor = new Doctor(req.body);

  let doctorExists = Doctor.findOne({
    medicalCertificate: req.body.medicalCertificate,
  });

  doctorExists.then(function (IsDoctorExists) {
    if (IsDoctorExists) {
      res.status(400).send({
        message: "Doctor already exists",
        doctor: IsDoctorExists,
      });
    } else {
      doctor.save(function (err, doctor) {
        if (err) {
          res.send(err);
          res.status(500);
        }
        else{
          res.json(doctor);
          res.status(201);
        }
      });
    }
  });
};

//get all the doctors
exports.GetAllDoctors = function (req, res) {
  Doctor.find(function (err, doctors) {
    if (err) {
      res.send(err);
      res.status(500);
    }

    if (!doctors || doctors.length === 0) {
      res.status(404).send({
        message: "Doctors not found",
      });
    } else {
      res.json(doctors);
    }
  });
};

//get a specific doctor by id
exports.getDoctor = function (req, res) {
  let doctorId = req.params.doctorId;

  if (!doctorId) {
    res.status(400).send({
      message: "Doctor id is required",
    });
  } else {
    Doctor.findById(doctorId, function (err, doctor) {
      if (err) {
        res.send(err);
        res.status(500);
      }

      // if no doctor is found
      if (!doctor) {
        res.status(404).send({
          message: "Doctor not found",
        });
      } else {
        res.json(doctor);
      }
    });
  }
};

//update a doctor (via patch)
exports.updateDoctor = function (req, res) {
  let doctorId = req.params.doctorId;

  if (!doctorId) {
    res.status(400).send({
      message: "Doctor id is required",
    });
  }

  Doctor.findById(doctorId, function (err, doctor) {
    if (err) {
      res.send(err);
      res.status(500);
    }

    if (!doctor) {
      res.status(404).send({
        message: "Doctor not found",
      });
    } else {
      doctor.name = req.body.firstName;
      doctor.lastName = req.body.lastName;
      doctor.medicalCertificate = req.body.medicalCertificate;

      doctor.save(function (err, doctor) {
        if (err) {
          res.send(err);
          res.status(500);
        } else {
          res.json(doctor);
        }
      });
    }
  });
};

//delete a doctor

exports.deleteDoctor = function (req, res) {
  let doctorId = req.params.doctorId;

  if (!doctorId) {
    res.status(400).send({
      message: "Doctor id is required",
    });
  }

  Doctor.findByIdAndRemove(doctorId, function (err, doctor) {
    if (err) {
      res.send(err);
      res.status(500);
    }

    if (!doctor) {
      res.status(404).send({
        message: "Doctor not found",
      });
    } else {
      res.json({
        message: "Doctor successfully deleted",
      });
    }
  });
};
