const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  enviarCorreo: (req, res) => {
    const { nombre, mensaje, email, telefono } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, 
      subject: 'Confirmación de contacto',
      text: `Hola ${nombre},\n\nGracias por contactarnos.\n\nDetalles del mensaje:\n\nNombre: ${nombre}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo: ', error);
        return res.status(500).json({ success: 0, message: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado: ' + info.response);
        return res.status(200).json({ success: 1, message: 'Correo enviado correctamente' });
      }
    });
  }
};
