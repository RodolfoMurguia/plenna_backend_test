"use strict";

module.exports = function (app) {
  var DoctorController = require("../controllers/DoctorController");

  app.route("/api/doctors/")
    .get(DoctorController.GetAllDoctors)
    .post(DoctorController.CreateDoctor)

  app.route("/api/doctors/:doctorId")
    .get(DoctorController.getDoctor)
    .patch(DoctorController.updateDoctor)
    .delete(DoctorController.deleteDoctor)

};
