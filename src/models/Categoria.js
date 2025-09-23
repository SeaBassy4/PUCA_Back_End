const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Debe llevar nombre"],
  },
});

module.exports = mongoose.model("Categoria", CategoriaSchema, "Categoria");
