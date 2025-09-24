const Tamaño = require("../models/Tamaño.model");

const getTamaños = async (req, res) => {
  try {
    const tamaños = await Tamaño.find();
    res.status(200).json(tamaños);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTamaño = async (req, res) => {
  try {
    const { nombre, precioExtra } = req.body;

    const nuevoTamaño = new Tamaño({
      nombre,
      precioExtra,
    });

    await nuevoTamaño.save();

    res.status(201).json({
      ok: true,
      message: "El tamaño fue creado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const putTamaño = async (req, res) => {
  try {
    const idTamaño = req.params.id;
    const datosActualizados = req.body;

    const resultado = await Tamaño.findByIdAndUpdate(
      idTamaño,
      datosActualizados,
      { new: true }
    );

    if (!resultado) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el tamaño a actualizar",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Tamaño actualizado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const deleteTamaño = async (req, res) => {
  try {
    const idTamaño = req.params.id;
    const resultado = await Tamaño.deleteOne({ _id: idTamaño });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el tamaño a eliminar",
      });
    }

    res.json({ ok: true, message: "Tamaño eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getTamaños,
  postTamaño,
  putTamaño,
  deleteTamaño,
};
