const express = require("express");
require('dotenv').config();
const cors = require('cors'); 
const app = express();
const reservacionesRouter = require("./reservaciones/router");

app.use(express.json());
app.use(cors()); 

app.use("/reservaciones", reservacionesRouter);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
