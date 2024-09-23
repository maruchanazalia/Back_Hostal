const pool = require("../db/db");

module.exports = {
  createReservacion: (data, callBack) => {
    pool.query(
      `INSERT INTO reservaciones (nombre, apellido, email, telefono, numero_personas, fecha_llegada, fecha_salida) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [data.nombre, data.apellido, data.email, data.telefono, data.numero_personas, data.fecha_llegada, data.fecha_salida],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllReservaciones: (callBack) => {
    pool.query(
      `SELECT * FROM reservaciones`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteReservacion: (id, callBack) => {
    pool.query(
      `DELETE FROM reservaciones WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
