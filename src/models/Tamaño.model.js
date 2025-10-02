const mongoose = require("mongoose");

const TamañoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Debe llevar nombre"],
  },
  precioExtra: {
    type: Number,
    required: [true, "Debe llevar precio extra"],
    min: [0, "El precio extra no puede ser negativo"],
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Tamaño", TamañoSchema, "Tamaño");
