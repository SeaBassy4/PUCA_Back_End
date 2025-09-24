const express = require("express");
const router = express.Router();

//importar el controlador que le correponde

const tamañoController = require("../controllers/Tamaño.controller");

//ROUTES

router.get("/", tamañoController.getTamaños);
router.post("/", tamañoController.postTamaño);
router.put("/:id", tamañoController.putTamaño);
