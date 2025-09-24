const express = require ("express");
const router = express.Router();

//importar el controlador que le correponde

const productoController =  require("../controllers/Producto.controller");

//ROUTES

router.get("/", productoController.getProductos);


module.exports = router;