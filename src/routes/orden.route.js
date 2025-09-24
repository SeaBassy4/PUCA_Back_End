const express = require("express");
const router = express.Router();

//importar el controlador que le correponde

const ordenController = require("../controllers/Orden.controller");

//ROUTES

router.get("/", ordenController.getOrdenes);
router.post("/", ordenController.postOrden);

module.exports = router;