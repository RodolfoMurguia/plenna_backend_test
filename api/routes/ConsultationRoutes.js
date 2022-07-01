'use strict';

module.exports = function (app) {

    var ConsultationController = require('../controllers/ConsultationController');

    app.route('/api/consultations/')
        .get(ConsultationController.ListConsultations)
        .post(ConsultationController.CreateConsultation)

    app.route('/api/consultations/:pacientId')
        .get(ConsultationController.ListConsultationsByPacient)

    app.route('/api/consultations/:consultationId')
        .patch(ConsultationController.UpdateConsultation)
        .delete(ConsultationController.DeleteConsultation)
};