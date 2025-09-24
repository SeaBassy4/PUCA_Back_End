const Orden = require("../models/Orden.model");

const getOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find();

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

module.exports = {
  getOrdenes,
  postOrden,
};
