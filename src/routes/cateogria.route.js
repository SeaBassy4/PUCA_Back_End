const express = require("express");
const router = express.Router();

//importar el controlador que le correponde

const categoriaController = require("../controllers/Categoria.controller");

//ROUTES

router.get("/", categoriaController.getCategorias);
router.post("/", categoriaController.postCategoria);
router.put("/:id", categoriaController.putCategoria);
router.delete("/:id", categoriaController.deleteCategoria);

module.exports = router;