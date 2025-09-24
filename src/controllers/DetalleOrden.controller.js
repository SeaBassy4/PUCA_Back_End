const DetalleOrden = require("../models/DetalleOrden.model");

const getDetalleOrdenes = async (req, res) => {
  try {
    const detalleOrdenes = await DetalleOrden.find();

    res.status(200).json(detalleOrdenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postDetalleOrden = async (req, res) => {
  try {
    const { idOrden, idProducto, idTamaño, cantidad, precioUnitario } =
      req.body;

    const nuevoDetalleOrden = new DetalleOrden({
      idOrden,
      idProducto,
      idTamaño,
      cantidad,
      precioUnitario,
    });

    await nuevoDetalleOrden.save();

    res
      .status(201)
      .json({ ok: true, message: "detalleOrden creado exitosamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = { getDetalleOrdenes, postDetalleOrden };
