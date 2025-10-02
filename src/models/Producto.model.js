const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  idCategoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: [true, "Debe llevar categoria"],
  },
  nombre: {
    type: String,
    required: [true, "Debe llevar nombre"],
  },
  descripcion: {
    type: String,
    required: [true, "Debe llevar descripción"],
  },
  precioBase: {
    type: Number,
    required: [true, "el precio base es obligatorio"],
    min: [0, "La cantidad no puede ser negativa"],
  },
  imagenLink: {
    type: String,
    required: [true, "el enlace de la imagen es obligatoria"],
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Producto", ProductoSchema, "Producto");
