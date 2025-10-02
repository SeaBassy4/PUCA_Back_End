const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  celular: {
    type: String,
    required: [true, "El celular es obligatorio"],
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  rol: {
    type: String,
    enum: ["Administrador", "Empleado"],
    required: [true, "El rol es obligatorio"],
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Usuario", UsuarioSchema, "Usuario");
