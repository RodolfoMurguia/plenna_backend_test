const mongooose = require('mongoose');
const Schema = mongooose.Schema;

const DoctorSchema = new Schema({

    firstName: {
        type: String,
        required: 'Nombre del medico es requerido'
    },

    lastName: {
        type: String,
        required: 'Apellido del medico es requerido'
    },
    status: {
        type: Boolean,
        default: true
    },
    medicalCertificate: {
        type: String,
        required: 'Certificado medico es requerido'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongooose.model('Doctor', DoctorSchema);