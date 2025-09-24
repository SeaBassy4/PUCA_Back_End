const DetalleOrden = require("../models/DetalleOrden.model");

const getDetalleOrdenes = async (req, res) => {
  try {
    const detalleOrdenes = await DetalleOrden.find();

    res.status(200).json(detalleOrdenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
