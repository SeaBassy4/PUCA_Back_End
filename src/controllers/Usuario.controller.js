const Usuario = require("../models/Usuario.model");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const postUsuario = async (req, res) => {
  try {
    const { correo, celular, contraseña, nombre, rol } = req.body;

    const nuevoUsuario = new Usuario({
      correo,
      celular,
      contraseña,
      nombre,
      rol,
    });

    await nuevoUsuario.save();

    res.status(201).json({
      ok: true,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const putUsuario = async (req, res) => {
  try {
    const idUsuario = req.params.id;
    const datosActualizados = req.body;

    const resultado = await Usuario.findByIdAndUpdate(
      idUsuario,
      datosActualizados,
      { new: true }
    );

    if (!resultado) {
      return res
        .status(404)
        .json({ ok: false, message: "No se encontró el usuario a actualizar" });
    }

    res.status(200).json({
      ok: true,
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const idUsuario = req.params.id;
    const resultado = await Usuario.findByIdAndUpdate(
      idUsuario,
      { activo: false },
      { new: true }
    );

    if (!resultado) {
      return res
        .status(404)
        .json({ ok: false, message: "No se encontró el usuario a eliminar" });
    }

    res.json({ ok: true, message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
