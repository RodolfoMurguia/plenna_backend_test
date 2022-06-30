"use strict";

module.exports = function (app) {
  const PacientController = require("../controllers/PacientController");

  app.route("/api/pacients/")
    .get(PacientController.GetPacients)
    .post(PacientController.CreatePacient);

  app.route("/api/pacients/:pacientId")
    .get(PacientController.getPacientById)
    .patch(PacientController.UpdatePacient)
    .delete(PacientController.DeletePacient);
};
