const mongoose = require("mongoose");

const OrdenSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario es obligatorio"],
  },
  nombreCliente: {
    type: String,
    required: [true, "El nombre del cliente es obligatorio"],
  },
  fechaHora: {
    type: Date,
    required: [true, "La fecha y hora es obligatoria"],
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ["Pendiente", "Completada", "Cancelada"],
    default: "Pendiente",
  },
  total: {
    type: Number,
    required: [true, "El total es obligatorio"],
    min: [0, "El total no puede ser negativo"],
  },
});

module.exports = mongoose.model("Orden", OrdenSchema, "Orden");
