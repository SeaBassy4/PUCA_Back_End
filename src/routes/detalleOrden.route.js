const express = require("express");
const router = express.Router();

//importar el controlador que le correponde

const detalleOrdenController = require("../controllers/DetalleOrden.controller");

//ROUTES

router.get("/", detalleOrdenController.getDetalleOrdenes);
router.post("/", detalleOrdenController.postDetalleOrden);

module.exports = router;