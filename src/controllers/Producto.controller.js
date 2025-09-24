const Producto = require("../models/Producto.model");

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postProducto = async (req, res) => {
  try {
    const { idCategoria, nombre, descripcion, precioBase, imagenLink } =
      req.body;

    const nuevoProduct = new Producto({
      idCategoria,
      nombre,
      descripcion,
      precioBase,
      imagenLink,
    });

    await nuevoProduct.save();

    res
      .status(201)
      .json({ ok: true, message: "El producto fue creado exitosamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const putProducto = async (req, res) => {
  try {
    const idProducto = req.params.id;
    const nuevoProducto = req.body;

    const resultado = await Producto.findByIdAndUpdate(
      idProducto,
      nuevoProducto,
      { new: true }
    );

    if (!resultado) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el producto a actualizar",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Producto actualizado exitosamente",
      data: resultado,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const idProducto = req.params.id;
    const resultado = await Producto.deleteOne({ _id: idProducto });

    if (resultado.deletedCount === 0) {
      return res
        .json(404)
        .json({ ok: false, message: "No se encontró el producto a eliminar" });
    }

    res.json({ ok: true, message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

module.exports = {
  getProductos,
  deleteProducto,
  postProducto,
  putProducto,
};
