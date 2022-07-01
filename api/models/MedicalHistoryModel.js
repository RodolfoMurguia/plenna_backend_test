const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalHistorySchema = new Schema({
    pacient: {
        type: Schema.Types.ObjectId,
        ref: 'Pacient',
        required: 'Paciente es requerido'
    },
    hasFamilyHistory: {
        type: Boolean,
        default: false
    },
    familyHistory: {
        type: String,
        default: ''
    },
    hasCronicDiseases: {
        type: Boolean,
        default: false
    },
    chronicDiseases: {
        type: String,
        default: ''
    },
    hasAllergies: {
        type: Boolean,
        default: false
    },
    allergies: {
        type: String,
        default: ''
    },
    hasDrugHistory: {
        type: Boolean,
        default: false
    },
    drugHistory: {
        type: String,
        default: ''
    },
    hasStdHistory: {
        type: Boolean,
        default: false
    },
    stdHistory: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
