const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Debe llevar nombre"],
  },
  activo: {
    type: Boolean,
    default: true,
  },
  imagenLink: {
    type: String,
    required: [true, "el enlace de la imagen es obligatoria"],
  },
  bannerLink: {
    type: String,
    required: [true, "el enlace del banner es obligatoria"],
  },
});

module.exports = mongoose.model("Categoria", CategoriaSchema, "Categoria");
