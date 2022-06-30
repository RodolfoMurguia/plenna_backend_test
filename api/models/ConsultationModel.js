const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
  pacient: {
    type: Schema.Types.ObjectId,
    ref: "Pacient",
    required: "Paciente es requerido",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: "Doctor es requerido",
  },
  consultationDate: {
    type: Date,
    required: "Fecha de consulta es requerida",
  },
  consultationType: {
    type: String,
    required: "Tipo de consulta es requerida",
  },
  bloodPressure: {
    type: String,
    default: "",
  },
  temperature: {
    type: float,
    nullable: true,
  },
  weight: {
    type: float,
    nullable: true,
  },
  physicalExaminationNotes: {
    type: String,
    default: "",
  },
  diagnosis: {
    type: String,
    default: "",
  },
  treatment: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Consultation", ConsultationSchema);
