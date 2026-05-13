const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ ok: false, error: 'Faltan campos del formulario.' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Faltan EMAIL_USER o EMAIL_PASS en el archivo .env');
    return res.status(500).json({ ok: false, error: 'Falta configurar el correo del servidor.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'blncrtshots@gmail.com',
      subject: `Nuevo mensaje de ${nombre}`,
      html: `<p><b>Nombre:</b> ${nombre}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Mensaje:</b> ${mensaje}</p>`
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ ok: false, error: 'No se pudo enviar el correo.' });
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
  console.log(`En tu red local: http://TU-IP:${PORT}`);
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} ya esta en uso. Cierra el otro servidor o usa otro puerto.`);
    process.exit(1);
  }

  throw error;
});
