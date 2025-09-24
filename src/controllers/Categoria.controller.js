const Categoria = require("../models/Categoria.model");

const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevaCategoria = new Categoria({
      nombre,
    });

    await nuevaCategoria.save();

    res
      .status(201)
      .json({ ok: true, message: "La categoría fue creada exitosamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

const putCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.id;
    const nuevaCategoria = req.body;

    const resultado = await Categoria.findByIdAndUpdate(
      idCategoria,
      nuevaCategoria,
      { new: true }
    );
    if (!resultado) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró la categoría a actualizar",
      });
    }

    res.status(200).json({
      ok: true,
      message: "Categoría actualizada exitosamente",
      data: resultado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.id;

    const resultado = await Categoria.findByIdAndDelete(idCategoria);
    if (!resultado) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró la categoría a eliminar",
      });
    }
    res.status(200).json({
      ok: true,
      message: "Categoría eliminada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCategorias,
  postCategoria,
  putCategoria,
  deleteCategoria,
};
