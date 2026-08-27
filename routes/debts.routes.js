const express = require("express");
const router = express.Router();
const debtsController = require("../controllers/debts.controller");

router.get("/", debtsController.listarDeudas);
router.get("/:id", debtsController.obtenerDeuda);
router.post("/", debtsController.crearDeuda);
router.put("/:id", debtsController.actualizarDeuda);
router.delete("/:id", debtsController.eliminarDeuda);

module.exports = router;
