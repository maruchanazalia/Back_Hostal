const { createReservacion, getAllReservaciones, deleteReservacion } = require("./controller");
const router = require("express").Router();
const {enviarCorreo} = require("./email.Controller")

router.post("/", createReservacion);
router.get("/", getAllReservaciones);
router.delete("/:id", deleteReservacion);
router.post("/formulario", enviarCorreo);

module.exports = router;
