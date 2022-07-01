"use strict";

//import libraries and models
const mongooose = require("mongoose");
const MedicalHistory = mongooose.model("MedicalHistory");
const Pacient = mongooose.model("Pacient");

//create a new medical history
exports.CreateMedicalHistory = function (req, res) {
  let medicalHistory = new MedicalHistory(req.body);

  //validate pacient
  Pacient.findById(medicalHistory.pacient, (err, pacient) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
    } else {
      if (!pacient) {
        res.status(404).send({
          message: "Pacient not found",
        });
      } else {
        //we must have just one medical history per pacient
        MedicalHistory.findOne(
          { pacient: medicalHistory.pacient },
          (err, medicalHistory) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
            } else {
              if (medicalHistory) {
                res.status(409).send({
                  message: "Pacient already has a medical history",
                });
              }
              //save medical history
              else {
                medicalHistory.save((err, medicalHistory) => {
                  if (err) {
                    res.status(500).send({
                      message: err,
                    });
                  } else {
                    res.status(201).send({
                      message: "Medical history created",
                      medicalHistory: medicalHistory,
                    });
                  }
                });
              }
            }
          }
        );
      }
    }
  });
};

//get all the medical Histories
exports.GetAllMedicalHistories = function (req, res) {
  MedicalHistory.find(function (err, medicalHistories) {
    if (err) {
      res.status(500);
      res.send(err);
    }
    if (!medicalHistories || medicalHistories.length === 0) {
      res.status(404).send({
        message: "Medical Histories not found",
      });
    } else {
      res.json(medicalHistories);
    }
  });
};

//get a specific medical history by pacient id
exports.GetMedicalHistoryByPacientId = function (req, res) {
  let pacientId = req.params.pacientId;

  if (!pacientId) {
    res.status(400).send({
      message: "Pacient id is required",
    });
  } else {
    Pacient.findById(pacientId, function (err, pacient) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      if (!pacient) {
        res.status(404).send({
          message: "Pacient not found",
        });
      } else {
        MedicalHistory.find(
          { pacient: pacientId },
          function (err, medicalHistories) {
            if (err) {
              res.status(500);
              res.send(err);
            }
            if (!medicalHistories || medicalHistories.length === 0) {
              res.status(404).send({
                message: "Medical Histories not found",
              });
            } else {
              res.json(medicalHistories);
            }
          }
        );
      }
    });
  }
};

//update a medical History by id
exports.UpdateMedicalHistory = function (req, res) {
  let medicalHistoryId = req.params.medicalHistoryId;

  if (!medicalHistoryId) {
    res.status(400).send({
      message: "Medical History id is required",
    });
  } else {
    MedicalHistory.findById(medicalHistoryId, function (err, medicalHistory) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      if (!medicalHistory) {
        res.status(404).send({
          message: "Medical History not found",
        });
      } else {
        medicalHistory.pacient = req.body.pacient;
        medicalHistory.hasFamilyHistory = req.body.hasFamilyHistory;
        medicalHistory.familyHistory = req.body.familyHistory;
        medicalHistory.hasCronicDiseases = req.body.hasCronicDiseases;
        medicalHistory.chronicDiseases = req.body.chronicDiseases;
        medicalHistory.hasAllergys = req.body.hasAllergys;
        medicalHistory.allergies = req.body.allergies;
        medicalHistory.hasDrugHistory = req.body.hasDrugHistory;
        medicalHistory.drugHistory = req.body.drugHistory;
        medicalHistory.hasStdHistory = req.body.hasStdHistory;
        medicalHistory.stdHistory = req.body.stdHistory;

        medicalHistory.save(function (err, medicalHistoryUpdated) {
          if (err) {
            res.status(500);
            res.send(err);
          }
          res.status(200).json(medicalHistoryUpdated);
        });
      }
    });
  }
};

//delete a medical History by id
exports.DeleteMedicalHistory = function (req, res) {
  let medicalHistoryId = req.params.medicalHistoryId;

  if (!medicalHistoryId) {
    res.status(400).send({
      message: "Medical History id is required",
    });
  }

  MedicalHistory.findByIdAndRemove(
    medicalHistoryId,
    function (err, medicalHistory) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      if (!medicalHistory) {
        res.status(404).send({
          message: "Medical History not found",
        });
      } else {
        res
          .status(200)
          .send({ message: "Medical History succesfully deleted" });
      }
    }
  );
};
