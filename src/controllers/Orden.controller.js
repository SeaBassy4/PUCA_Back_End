const Orden = require("../models/Orden.model");

const getOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find().populate("idUsuario");

    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postOrden = async (req, res) => {
  try {
    const { idUsuario, nombreCliente, estado, total } = req.body;

    const nuevaOrden = new Orden({
      idUsuario,
      nombreCliente,
      fechaHora: new Date(),
      estado,
      total,
    });

    await nuevaOrden.save();

    res.status(201).json({ ok: true, message: "Orden creada exitosamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const putOrden = async (req, res) => {
  try {
    const idOrden = req.params.id;
    const nuevaOrden = req.body;

    const resultado = await Orden.findByIdAndUpdate(idOrden, nuevaOrden, {
      new: true,
    });

    if (!resultado) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró la orden a actualizar",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Orden actualizada exitosamente",
      data: resultado,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getOrdenes,
  postOrden,
  putOrden,
};
