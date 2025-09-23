const Producto = require("../models/Producto.model");

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProductos,
};
