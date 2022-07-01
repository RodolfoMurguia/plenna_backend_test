'use strict';

module.exports = function (app) {

    const MedicalHistoryController = require('../controllers/MedicalHistoryController');

    app.route('/api/medicalHistories/')
        .get(MedicalHistoryController.GetAllMedicalHistories)
        .post(MedicalHistoryController.CreateMedicalHistory);

    app.route('/api/medicalHistories/:medicalHistoryId')
        .patch(MedicalHistoryController.UpdateMedicalHistory)
        .delete(MedicalHistoryController.DeleteMedicalHistory);

    app.route('/api/medicalHistories/pacient/:pacientId')
        .get(MedicalHistoryController.GetMedicalHistoryByPacientId);
        
};
