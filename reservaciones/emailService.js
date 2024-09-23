const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

const enviarCorreo = (reservacionData, callback) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: 'maruchanycamaron26@gmail.com',
    subject: 'Nueva Reservación Recibida',
    text: `Has recibido una nueva reservación:
    
    Nombre: ${reservacionData.nombre}
    Apellido: ${reservacionData.apellido}
    Email: ${reservacionData.email}
    Teléfono: ${reservacionData.telefono}
    Número de Personas: ${reservacionData.numero_personas}
    Fecha de Llegada: ${reservacionData.fecha_llegada}
    Fecha de Salida: ${reservacionData.fecha_salida}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo: ', error);
      return callback(error);
    }
    console.log('Correo enviado: ' + info.response);
    callback(null, info.response);
  });
};

module.exports = { enviarCorreo };
