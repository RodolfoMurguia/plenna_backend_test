const mongooose = require('mongoose');
const Schema = mongooose.Schema;

const pacientSchema = new Schema({

    firstName: {
        type: String,
        required: 'Nombre del paciente es requerido'
    },
    lastName: {
        type: String,
        required: 'Apellido del paciente es requerido'
    },
    email: {
        type: String,
        required: 'Email del paciente es requerido'
    },
    phone: {
        type: String,
        required: 'Telefono del paciente es requerido'
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    }
    ,
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: 'Pais del paciente es requerido'
    },
    emergencyContact: {
        type: String,
        required: 'Contacto de emergencia del paciente es requerido'
    },
    emergencyContactPhone: {
        type: String,
        required: 'Telefono de contacto de emergencia del paciente es requerido'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongooose.model('Pacient', pacientSchema);