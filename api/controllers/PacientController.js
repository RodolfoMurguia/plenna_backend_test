//import libraries and models

const mongooose = require("mongoose");
const Pacient = mongooose.model("Pacient");

//create a new pacient
exports.CreatePacient = function (req, res) {
  var pacient = new Pacient(req.body);

  let pacientExists = Pacient.findOne({
    email: req.body.email,
    phone: req.body.phone,
  });

  pacientExists.then(function (IsPacientExists) {
    if (IsPacientExists) {
      res.status(400).send({
        message: "Pacient already exists",
        pacient: IsPacientExists,
      });
    } else {
      pacient.save(function (err, pacient) {
        if (err) {
          res.send(err);
          res.status(500);
        } else {
          res.status(201);
          res.json(pacient);
        }
      });
    }
  });
};

//get all the pacients
exports.GetPacients = function (req, res) {
  Pacient.find({}, function (err, pacients) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.json(pacients);
    }
  });
};

//get a pacient by id
exports.getPacientById = function (req, res) {
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
      } else {
        if (!pacient) {
          res.status(404).send({
            message: "Pacient not found",
          });
        } else {
          res.status(200).json(pacient);
        }
      }
    });
  }
};

//update a pacient
exports.UpdatePacient = function (req, res) {
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
      } else {
        if (!pacient) {
          res.status(404).send({
            message: "Pacient not found",
          });
        } else {
          pacient.firstName = req.body.firstName;
          pacient.lastName = req.body.lastName;
          pacient.email = req.body.email;
          pacient.phone = req.body.phone;
          pacient.address = req.body.address;
          pacient.city = req.body.city;
          pacient.state = req.body.state;
          pacient.country = req.body.country;
          pacient.emergencyContact = req.body.emergencyContact;
          pacient.emergencyContactPhone = req.body.emergencyContactPhone;

          pacient.save(function (err, pacient) {
            if (err) {
              res.send(err);
              res.status(500);
            } else {
              res.status(200);
              res.json(pacient);
            }
          });
        }
      }
    });
  }
};

//delete a pacient
exports.DeletePacient = function (req, res) {
  let pacientId = req.params.pacientId;

  if (!pacientId) {
    res.status(400).send({
      message: "Pacient id is required",
    });
  } else {
    Pacient.findByIdAndRemove(pacientId, function (err, pacient) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        if (!pacient) {
          res.status(404).send({
            message: "Pacient not found",
          });
        } else {
          res.status(200).send({ message: "Pacient succesfully deleted" });
        }
      }
    });
  }
};
