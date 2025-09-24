const express = require("express");
const router = express.Router();

//importar el controlador que le correponde

const usuarioController = require("../controllers/Usuario.controller");

//ROUTES

router.get("/", usuarioController.getUsuarios);
router.post("/", usuarioController.postUsuario);
router.put("/:id", usuarioController.putUsuario);
router.delete("/:id", usuarioController.deleteUsuario);

module.exports = router;