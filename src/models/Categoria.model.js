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
});

module.exports = mongoose.model("Categoria", CategoriaSchema, "Categoria");
