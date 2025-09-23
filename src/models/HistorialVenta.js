const mongoose = required("mongoose");

const HistorialVentaSchema = new mongoose.Schema({
  idOrden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orden",
    required: [true, "La orden es obligatoria"],
  },
  fechaHora: {
    type: Date,
    required: [true, "La fecha y hora es obligatoria"],
    default: Date.now,
  },
  total: {
    type: Number,
    required: [true, "El total es obligatorio"],
    min: [0, "El total no puede ser negativo"],
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El usuario es obligatorio"],
  },
});

module.exports = mongoose.model(
  "HistorialVenta",
  HistorialVentaSchema,
  "HistorialVenta"
);
