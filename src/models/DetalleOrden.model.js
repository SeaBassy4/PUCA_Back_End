const mongoose = require("mongoose");

const DetalleOrdenSchema = new mongoose.Schema({
  idOrden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orden",
    required: [true, "La orden es obligatoria"],
  },
  idProducto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: [true, "El producto es obligatorio"],
  },
  idTamaño: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tamaño",
    default: null,
  },
  cantidad: {
    type: Number,
    required: [true, "La cantidad es obligatoria"],
    min: [1, "La cantidad mínima es 1"],
  },
  precioUnitario: {
    type: Number,
    required: [true, "El precio unitario es obligatorio"],
    min: [0, "El precio unitario no puede ser negativo"],
  },
});

module.exports = mongoose.model(
  "DetalleOrden",
  DetalleOrdenSchema,
  "DetalleOrden"
);
