const { createReservacion, getAllReservaciones, deleteReservacion } = require("./service");
const { enviarCorreo } = require("./emailService");

module.exports = {
  createReservacion: (req, res) => {
    const { nombre, apellido, email, telefono, numero_personas, fecha_llegada, fecha_salida } = req.body;

    const nuevaReservacion = { nombre, apellido, email, telefono, numero_personas, fecha_llegada, fecha_salida };

    createReservacion(nuevaReservacion, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Error en la conexión de la BD',
        });
      }

      enviarCorreo(nuevaReservacion, (error, info) => {
        if (error) {
          return res.status(500).json({
            success: 0,
            message: 'Error al enviar el correo',
          });
        }

        return res.status(200).json({
          success: 1,
          message: 'Reservación creada y correo enviado correctamente',
          data: results,
        });
      });
    });
  },

  getAllReservaciones: (req, res) => {
    getAllReservaciones((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Error en la conexión de la BD',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  deleteReservacion: (req, res) => {
    const reservacionId = req.params.id;
    deleteReservacion(reservacionId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Error en la conexión de la BD',
        });
      }
      return res.status(200).json({
        success: 1,
        message: 'Reservación eliminada correctamente',
      });
    });
  }
};
