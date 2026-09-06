const express = require("express");
const router = express.Router();
const multer = require("multer");
const clientesController = require("../controllers/clients.controller");

const upload = multer({ storage : multer.memoryStorage()});

router.get("/", clientesController.listarClientes);
router.get("/:id", clientesController.obtenerCliente);
router.post("/", upload.single('imagen'), clientesController.crearCliente);
router.put("/:id" , upload.single('imagen'), clientesController.actualizarCliente);
router.delete("/:id", clientesController.eliminarCliente);

module.exports = router;