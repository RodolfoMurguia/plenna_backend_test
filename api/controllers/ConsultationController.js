//import libraries

const mongooose = require("mongoose");
const Consultation = mongooose.model("Consultation");
const Doctor = mongooose.model("Doctor");
const Pacient = mongooose.model("Pacient");

//generate a new consultation
exports.CreateConsultation = function (req, res) {
  let consultation = new Consultation(req.body);

  //validate for doctor and pacient
  let doctorExists = Doctor.findOne({
    _id: req.body.doctor,
  });

  let pacientExists = Pacient.findOne({
    _id: req.body.pacient,
  });

  Promise.all([doctorExists, pacientExists])
    .then(function (values) {
      if (values[0] && values[1]) {
        consultation.save(function (err, consultation) {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(201).json(consultation);
          }
        });
      } else {
        res.status(500).json({ message: "Doctor or pacient doesn't exist" });
      }
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
};

//list all the consultations available
exports.ListConsultations = function (req, res) {
  Consultation.find({}, function (err, consultations) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(consultations);
    }
  }).sort({ consultationDate: -1, createdAt: -1 });
};

//list all the consultation of a specific pacient

exports.ListConsultationsByPacient = function (req, res) {
  let pacientId = req.params.pacientId;

  if (!pacientId) {
    res.status(400).send({
      message: "Pacient id is required",
    });
  } else {
    Consultation.find({ pacient: pacientId }, function (err, consultations) {
      if (err) {
        res.status(500).json(err);
      } else {
        if (!consultations || consultations.length === 0) {
          res.status(404).send({
            message: "Consultations not found for this pacient",
          });
        } else {
          res.status(200).json(consultations);
        }
      }
    }).sort({ consultationDate: -1, createdAt: -1 });
  }
};

//update a consultation

exports.UpdateConsultation = function (req, res) {
  let consultationId = req.params.consultationId;

  if (!consultationId) {
    res.status(400).send({
      message: "Consultation id is required",
    });
  }

  Consultation.findById(consultationId, function (err, consultation) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (!consultation) {
        res.status(404).send({
          message: "Consultation not found",
        });
      } else {
        //make the actual update
        consultation.consultationDate = req.body.consultationDate;
        consultation.consultationType = req.body.consultationType;
        consultation.bloodPressure = req.body.bloodPressure;
        consultation.temperature = req.body.temperature;
        consultation.weight = req.body.weight;
        consultation.physicalExaminationNotes =
          req.body.physicalExaminationNotes;
        consultation.diagnosis = req.body.diagnosis;
        consultation.treatment = req.body.treatment;
        consultation.notes = req.body.notes;
        res.status(200).json(consultation);
      }
    }
  });
};

//delete a consultation

exports.DeleteConsultation = function (req, res) {
  let consultationId = req.params.consultationId;

  if (!consultationId) {
    res.status(400).send({
      message: "Consultation id is required",
    });
  } else {
    Consultation.findByIdAndRemove(
      consultationId,
      function (err, consultation) {
        if (err) {
          res.status(500).send(err);
        } else {
          if (!consultation) {
            res.status(404).send({
              message: "Consultation not found",
            });
          } else {
            res.status(200).json({ message: "Consultation deleted" });
          }
        }
      }
    );
  }
};
